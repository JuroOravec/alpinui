/* eslint-disable no-console */

// Types
import type { Alpine as AlpineType } from 'alpinejs';
import type { toRaw as _toRaw, stop as _stop } from 'vue';

const _refBrand = Symbol('alpine-reactivity:ref');

declare global {
  var _alpineReactivity: {
    Alpine: AlpineType | null;
  };
}

// Let users to set the Alpine instance globally
globalThis._alpineReactivity = {
  Alpine: null,
};

export const setAlpine = (instance: AlpineType) => {
  globalThis._alpineReactivity.Alpine = instance;
};

export const getAlpine = (): AlpineType => globalThis._alpineReactivity.Alpine!;

if (globalThis.document) {
  document.addEventListener('alpine:init', () => {
    setAlpine((globalThis as any).Alpine)
  });
}

// Types based on @vue/reactivity
// https://github.com/vuejs/composition-api/blob/2436ba2ca0ae804a3932924407f54e675073ea5c/src/reactivity/ref.ts
export interface Ref<T = any> {
  readonly [_refBrand]: true;
  value: T;
}

export type MaybeRef<T> = T | Ref<T>;

export interface ComputedRef<T = any> extends Ref<T> {
  /** `effect` is added to be able to differentiate refs from computed properties. */
  effect: true;
  readonly value: T;
}

export type ToRefs<T extends object> = { [K in keyof T]: ComputedRef<UnwrapRef<T[K]>> };

export const computed = <T = any>(cb: () => T) => {
  let innerValue: T;

  // Make sure that the computed value is accessible via `x.value`,
  // and that it's immutable from outside.
  const val: ComputedRef<T> = Object.freeze({
    [_refBrand]: true,
    effect: true,
    get value() {
      return innerValue;
    },
  });

  getAlpine().effect(() => {
    const res = cb();
    innerValue = res;
  });

  return val;
};

export const reactive = <T = any>(val: T): T => getAlpine().reactive(val);

export const ref = <T = any>(value: T | undefined = undefined): T extends Ref<any> ? T : Ref<T> => {
  if (isRef(value)) return value as any;

  // Make sure that the rf value is accessible via `x.value`.
  const r = getAlpine().reactive<Ref<T>>({
    [_refBrand]: true,
    value: value as any,
  }) as any;

  return Object.seal(r);
};

export const writableComputed = <T = any>(options: {
  get: () => T;
  set: (newVal: T) => void;
}): Ref<T> => {
  const r = Object.seal({
    [_refBrand]: true,
    get value() {
      return options.get();
    },
    set value(newVal) {
      options.set(newVal);
    },
  }) as any;

  return Object.seal(r);
};

export function isRef<T>(value: any): value is Ref<T> {
  if (typeof value !== 'object' || value == null) return false;

  return _refBrand in value;
}

export const isComputed = <T = any>(value: any): value is ComputedRef<T> => {
  if (!isRef(value)) return false;

  return !!(value as ComputedRef<T>).effect;
};

export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? (ref.value as any) : ref;
}

export const shallowRef = <T = any>(initialValue: T | undefined = undefined) => {
  const innerRef = ref(initialValue);

  // Use computed to return the value of the ref
  return writableComputed<T>({
    get: () => innerRef.value,
    set: (newValue) => {
      innerRef.value = newValue;
    },
  });
};

export const toRef = <T extends object, K extends keyof T>(object: T, key: K) => {
  return writableComputed<T[K]>({
    get: () => object[key],
    set: (value) => {
      object[key] = value;
    },
  });
};

const propertyToRef = <T = any>(source: Record<string, any>, key: string) => {
  return computed<T>(() => source[key]);
};

export const toRefs = <T extends object>(object: T): ToRefs<T> => {
  const ret: any = Array.isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
};

// See
// https://github.com/alpinejs/alpine/blob/ab743bc5668f018db5d410cad4e48b755696ad9e/packages/alpinejs/src/index.js#L41C61-L41C62
export const toRaw: typeof _toRaw = (...args) => getAlpine().raw(...args);

// See
// https://github.com/alpinejs/alpine/blob/ab743bc5668f018db5d410cad4e48b755696ad9e/packages/alpinejs/src/index.js#L41C61-L41C62
export const stop: typeof _stop = (...args) => getAlpine().release(...(args as [any]));

export type UnwrapRef<T> = T extends Ref<infer V>
  ? UnwrapRefSimple<V>
  : T extends ComputedRef<infer V>
  ? UnwrapRefSimple<V>
  : UnwrapRefSimple<T>;

export type UnwrapRefSimple<T> = T extends Ref
  ? T
  : T extends Map<infer K, infer V>
  ? Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Map<any, any>>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakMap<any, any>>>
  : T extends Set<infer V>
  ? Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Set<any>>>
  : T extends WeakSet<infer V>
  ? WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakSet<any>>>
  : T extends ReadonlyArray<any>
  ? { [K in keyof T]: UnwrapRefSimple<T[K]> }
  : T;

/**
 * @example
 *
 * const state = readonly({
 *   count: 1,
 *   nested: {
 *     value: 10,
 *   },
 * });
 *
 * console.log(state.count); // Output: 1
 * state.count = 2;          // Warning: Cannot set property count on a readonly object
 * console.log(state.count); // Output: 1
 * delete state.count;       // Warning: Cannot delete property count on a readonly object
 *
 * console.log(state.nested.value); // Output: 10
 * state.nested.value = 20;         // Warning: Cannot set property value on a readonly object
 * console.log(state.nested.value); // Output: 10
 */
export const readonly = <T>(target: T) => {
  if (typeof target !== 'object' || target === null) {
    return target; // If not an object, return the target as is
  }

  // Create a proxy to prevent modifications
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      return readonly(result); // Recursively make nested properties readonly
    },
    set(target, key, value) {
      console.warn(`Cannot set property ${key.toString()} on a readonly object`);
      return true; // Indicate success to avoid runtime errors
    },
    deleteProperty(target, key) {
      console.warn(`Cannot delete property ${key.toString()} on a readonly object`);
      return true; // Indicate success to avoid runtime errors
    },
  });
};

// Copy of Vue's DeepReadonly to appease the TypeScript gods
type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type Builtin = Primitive | Function | Date | Error | RegExp;
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends Ref<infer U>
  ? Readonly<Ref<DeepReadonly<U>>>
  : T extends {}
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    }
  : Readonly<T>;

// ////////////////////////////////////
// ////////////////////////////////////
//
// VUE WATCH
//
// ////////////////////////////////////
// ////////////////////////////////////

// Simpler reimplementation of `@vue-reactivity/watch` that depends
// only on `Alpine.effect`, `Alpine.reactive`, and `Alpine.raw`.
// https://github.com/vue-reactivity/watch/blob/c7fa58e6be91f6bb6dbb5f4e4ff8158a4164afe2/src/index.ts

export type WatchEffect = () => void;

export type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);

export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;

export type WatchStopHandle = () => void;

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? V : T[K] extends object ? T[K] : never;
};

type MapOldSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never;
};

const INITIAL_WATCHER_VALUE = {};

const prepCb = (cb: (...args: any[]) => any, newVal: any, oldVal: any) => {
  return () => 
    cb(
      newVal,
      // pass undefined as the old value when it's changed for the first time
      oldVal === INITIAL_WATCHER_VALUE ? undefined : oldVal
    );
}

export interface WatchOptions<Immediate = boolean> {
  immediate?: Immediate;
  deep?: boolean;
  flush?: 'pre' | 'sync' | 'post';
}

export function watchEffect(effect: () => unknown): WatchStopHandle {
  const stopHandle = getAlpine().effect(effect);
  return () => stopHandle();
}

// overload #1: array of multiple sources + cb
// Readonly constraint helps the callback to correctly infer value types based
// on position in the source array. Otherwise the values will get a union type
// of all possible value types.
export function watch<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false
>(
  sources: T,
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle;

// overload #2: single source + cb
export function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle;

// implementation
export function watch<T = any>(
  source: WatchSource<T> | WatchSource<T>[],
  cb: WatchCallback<T>,
  options?: WatchOptions
): WatchStopHandle {
  return doWatch(source, cb, options);
}

function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect,
  cb: WatchCallback,
  { immediate, deep, flush = 'pre' }: WatchOptions = {}
): WatchStopHandle {
  let getter: () => any;
  let isMultiSource = false;

  if (isRef(source)) {
    getter = () => source.value;
  } else if (Array.isArray(source)) {
    isMultiSource = true;
    getter = () =>
      source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, 'watch getter');
        } else {
          return console.warn('invalid source');
        }
      });
  } else if (isFunction(source)) {
    getter = () => callWithErrorHandling(source, 'watch getter');
  } else {
    getter = () => {}; // NOOP
  }

  if (deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }

  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  let isFirstRun = true;

  return watchEffect(() => {
    const newValue = getter();

    if (isFirstRun) {
      isFirstRun = false;
      if (!immediate) {
        return;
      }
    }

    const didChange = isMultiSource
      ? (newValue as any[]).some((v, i) => hasChanged(v, (oldValue as any[])[i]))
      : hasChanged(newValue, oldValue);

    if (didChange) {
      const runCb = prepCb(cb, newValue, oldValue);
      oldValue = newValue;

      if (flush === 'post') {
        getAlpine().nextTick(() => runCb());
      } else {
        // TODO: Assuming this behaves like `pre`, we don't really have implement
        // for `sync`.
        runCb();
      }
    }
  });
}

function traverse(value: unknown, seen: Set<unknown> = new Set()) {
  if (!isObject(value) || seen.has(value)) {
    return value;
  }

  seen.add(value);
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (value instanceof Map) {
    value.forEach((_, key) => {
      // to register mutation dep for existing keys
      traverse(value.get(key), seen);
    });
  } else if (value instanceof Set) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else {
    for (const key of Object.keys(value)) {
      traverse(value[key], seen);
    }
  }
  return value;
}

function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

function isFunction(x: unknown): x is Function {
  return typeof x === 'function';
}

// compare whether a value has changed, accounting for NaN.
function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(value, oldValue);
}

function callWithErrorHandling(fn: Function, type: string, args?: unknown[]) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    console.error(`${type}: ${err}`);
  }
  return res;
}
