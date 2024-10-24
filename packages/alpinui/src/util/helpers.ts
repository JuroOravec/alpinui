// NOTE(Alpinui): Do NOT import from `vue` in this file (Importing types is OK)
// Instead use a dedicated file like `vnode.ts`, so that we import `vue` only
// for Vue build.

// Utilities
import { IN_BROWSER } from '@/util/globals';

// Types
import type { AlpineInstance, Data } from 'alpine-composition';
import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  ComputedGetter,
  InjectionKey,
  PropType,
  Ref,
  StyleValue,
  ToRefs,
  VNodeChild,
} from 'vue';
import type { ClassValue } from '@/composables/component';
import type { HeadlessInstance } from '@/engines/types';

// See https://github.com/vuejs/core/blob/91112520427ff55941a1c759d7d60a0811ff4a61/packages/shared/src/general.ts#L93
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as T;
};

// See https://github.com/vuejs/core/blob/91112520427ff55941a1c759d7d60a0811ff4a61/packages/shared/src/general.ts#L120
export const capitalize = cacheStringFunction(<T extends string>(str: T) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
});

// See https://github.com/vuejs/core/blob/7e75de002f08076a02c9361a58fa1d0af1772964/packages/shared/src/general.ts#L101
const camelizeRE = /-(\w)/g;
/**
 * @private
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

export function getNestedValue(obj: any, path: (string | number)[], fallback?: any): any {
  const last = path.length - 1;

  if (last < 0) return obj === undefined ? fallback : obj;

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }

  if (obj == null) return fallback;

  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}

export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (
    a instanceof Date &&
    b instanceof Date &&
    a.getTime() !== b.getTime()
  ) {
    // If the values are Date, compare them as timestamps
    return false;
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }

  return props.every((p) => deepEqual(a[p], b[p]));
}

export function getObjectValueByPath(obj: any, path?: string | null, fallback?: any): any {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback);
}

export type SelectItemKey<T = Record<string, any>> =
  | boolean | null | undefined // Ignored
  | string // Lookup by key, can use dot notation for nested objects
  | readonly (string | number)[] // Nested lookup by key, each array item is a key in the next level
  | ((item: T, fallback?: any) => any)

export function getPropertyFromItem(
  item: any,
  property: SelectItemKey,
  fallback?: any
): any {
  if (property === true) return item === undefined ? fallback : item;

  if (property == null || typeof property === 'boolean') return fallback;

  if (item !== Object(item)) {
    if (typeof property !== 'function') return fallback;

    const value = property(item, fallback);

    return typeof value === 'undefined' ? fallback : value;
  }

  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);

  if (Array.isArray(property)) return getNestedValue(item, property, fallback);

  if (typeof property !== 'function') return fallback;

  const value = property(item, fallback);

  return typeof value === 'undefined' ? fallback : value;
}

export function createRange(length: number, start = 0): number[] {
  return Array.from({ length }, (v, k) => start + k);
}

export function getZIndex(el?: Element | null): number {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;

  const index = +window.getComputedStyle(el).getPropertyValue('z-index');

  if (!index) return getZIndex(el.parentNode as Element);
  return index;
}

export function convertToUnit (str: number, unit?: string): string
export function convertToUnit (str: string | number | null | undefined, unit?: string): string | undefined
export function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str!)) {
    return String(str);
  } else if (!isFinite(+str!)) {
    return undefined;
  } else {
    return `${Number(str)}${unit}`;
  }
}

export function isObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function refElement(obj?: ComponentPublicInstance | HTMLElement | null): HTMLElement | undefined {
  if (obj && '$el' in obj) {
    const el = obj.$el;
    if (el?.nodeType === Node.TEXT_NODE) {
      // Multi-root component, use the first element
      return el.nextElementSibling as HTMLElement;
    }
    return el;
  }
  return obj as HTMLElement;
}

// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16,
});

export const keyValues: Record<string, string> = Object.freeze({
  enter: 'Enter',
  tab: 'Tab',
  delete: 'Delete',
  esc: 'Escape',
  space: 'Space',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  end: 'End',
  home: 'Home',
  del: 'Delete',
  backspace: 'Backspace',
  insert: 'Insert',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  shift: 'Shift',
});

export function keys<O extends {}>(o: O) {
  return Object.keys(o) as (keyof O)[];
}

export function has<T extends string>(obj: object, key: T[]): obj is Record<T, unknown> {
  return key.every((k) => obj.hasOwnProperty(k));
}

type MaybePick<
  T extends object,
  U extends Extract<keyof T, string>
> = Record<string, unknown> extends T ? Partial<Pick<T, U>> : Pick<T, U>

// Array of keys
export function pick<
  T extends object,
  U extends Extract<keyof T, string>
>(obj: T, paths: U[]): MaybePick<T, U> {
  const found: any = {};

  const keys = new Set(Object.keys(obj));
  for (const path of paths) {
    if (keys.has(path)) {
      found[path] = obj[path];
    }
  }

  return found;
}

// Array of keys
export function pickWithRest<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
> (obj: T, paths: U[], exclude?: E[]): [yes: MaybePick<T, Exclude<U, E>>, no: Omit<T, Exclude<U, E>>]
// Array of keys or RegExp to test keys against
export function pickWithRest<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
> (obj: T, paths: (U | RegExp)[], exclude?: E[]): [yes: Partial<T>, no: Partial<T>]
export function pickWithRest<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
>(obj: T, paths: (U | RegExp)[], exclude?: E[]): [yes: Partial<T>, no: Partial<T>] {
  const found = Object.create(null);
  const rest = Object.create(null);

  for (const key in obj) {
    if (
      paths.some((path) => path instanceof RegExp
        ? path.test(key)
        : path === key
      ) && !exclude?.some((path) => path === key)
    ) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }

  return [found, rest];
}

export function omit<
  T extends object,
  U extends Extract<keyof T, string>
>(obj: T, exclude: U[]): Omit<T, U> {
  const clone = { ...obj };

  exclude.forEach((prop) => delete clone[prop]);

  return clone;
}

export function only<
  T extends object,
  U extends Extract<keyof T, string>
>(obj: T, include: U[]): Pick<T, U> {
  const clone = {} as T;

  include.forEach((prop) => clone[prop] = obj[prop]);

  return clone;
}

const onRE = /^on[^a-z]/;
export const isOn = (key: string) => onRE.test(key);

const bubblingEvents = [
  'onAfterscriptexecute',
  'onAnimationcancel',
  'onAnimationend',
  'onAnimationiteration',
  'onAnimationstart',
  'onAuxclick',
  'onBeforeinput',
  'onBeforescriptexecute',
  'onChange',
  'onClick',
  'onCompositionend',
  'onCompositionstart',
  'onCompositionupdate',
  'onContextmenu',
  'onCopy',
  'onCut',
  'onDblclick',
  'onFocusin',
  'onFocusout',
  'onFullscreenchange',
  'onFullscreenerror',
  'onGesturechange',
  'onGestureend',
  'onGesturestart',
  'onGotpointercapture',
  'onInput',
  'onKeydown',
  'onKeypress',
  'onKeyup',
  'onLostpointercapture',
  'onMousedown',
  'onMousemove',
  'onMouseout',
  'onMouseover',
  'onMouseup',
  'onMousewheel',
  'onPaste',
  'onPointercancel',
  'onPointerdown',
  'onPointerenter',
  'onPointerleave',
  'onPointermove',
  'onPointerout',
  'onPointerover',
  'onPointerup',
  'onReset',
  'onSelect',
  'onSubmit',
  'onTouchcancel',
  'onTouchend',
  'onTouchmove',
  'onTouchstart',
  'onTransitioncancel',
  'onTransitionend',
  'onTransitionrun',
  'onTransitionstart',
  'onWheel',
];

const compositionIgnoreKeys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'ArrowLeft',
  'Enter',
  'Escape',
  'Tab',
  ' ',
];

export function isComposingIgnoreKey(e: KeyboardEvent): boolean {
  return e.isComposing && compositionIgnoreKeys.includes(e.key);
}

/**
 * Filter attributes that should be applied to
 * the root element of an input component. Remaining
 * attributes should be passed to the <input> element inside.
 */
export function filterInputAttrs(attrs: Record<string, unknown>) {
  const [events, props] = pickWithRest(attrs, [onRE]);
  const inputEvents = omit(events, bubblingEvents);
  const [rootAttrs, inputAttrs] = pickWithRest(props, ['class', 'style', 'id', /^data-/]);
  Object.assign(rootAttrs, events);
  Object.assign(inputAttrs, inputEvents);
  return [rootAttrs, inputAttrs];
}

/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */
export function arrayDiff(a: any[], b: any[]): any[] {
  const diff: any[] = [];
  for (let i = 0; i < b.length; i++) {
    if (!a.includes(b[i])) diff.push(b[i]);
  }
  return diff;
}

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
export function wrapInArray<T>(
  v: T | null | undefined
): T extends readonly any[]
    ? IfAny<T, T[], T>
    : NonNullable<T>[] {
  return v == null
    ? []
    : Array.isArray(v)
      ? v as any : [v];
}

export function defaultFilter(value: any, search: string | null, item: any) {
  return value != null &&
    search != null &&
    typeof value !== 'boolean' &&
    value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}

export function debounce(vm: HeadlessInstance, fn: Function, delay: MaybeRef<number>) {
  const { unref } = vm.reactivity;

  let timeoutId = 0 as any;
  const wrap = (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), unref(delay));
  };
  wrap.clear = () => {
    clearTimeout(timeoutId);
  };
  wrap.immediate = fn;
  return wrap;
}

export function throttle<T extends(...args: any[]) => any> (fn: T, limit: number) {
  let throttling = false;
  return (...args: Parameters<T>): void | ReturnType<T> => {
    if (!throttling) {
      throttling = true;
      setTimeout(() => throttling = false, limit);
      return fn(...args);
    }
  };
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function getDecimals(value: number) {
  const trimmedStr = value.toString().trim();
  return trimmedStr.includes('.')
    ? (trimmedStr.length - trimmedStr.indexOf('.') - 1)
    : 0;
}

export function padEnd(str: string, length: number, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length));
}

export function padStart(str: string, length: number, char = '0') {
  return char.repeat(Math.max(0, length - str.length)) + str;
}

export function chunk(str: string, size = 1) {
  const chunked: string[] = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}

export function chunkArray(array: any[], size = 1) {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function humanReadableFileSize(bytes: number, base: 1000 | 1024 = 1000): string {
  if (bytes < base) {
    return `${bytes} B`;
  }

  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}

export function mergeDeep(
  source: Record<string, any> = {},
  target: Record<string, any> = {},
  arrayFn?: (a: unknown[], b: unknown[]) => unknown[],
) {
  const out: Record<string, any> = {};

  for (const key in source) {
    out[key] = source[key];
  }

  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];

    // Only continue deep merging if
    // both properties are objects
    if (
      isObject(sourceProperty) &&
      isObject(targetProperty)
    ) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);

      continue;
    }

    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);

      continue;
    }

    out[key] = targetProperty;
  }

  return out;
}

export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str)!;
  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = new Map<string, string>();

export type MaybeRef<T> = T | Ref<T>

export function findIndexOfChildrenWithProvide(
  groupVm: HeadlessInstance,
  itemVm: HeadlessInstance,
  key: InjectionKey<any> | symbol,
): number {
  if (groupVm.type === 'vue') {
    const children = findChildrenWithProvideVue(key, groupVm.instance<ComponentInternalInstance>()?.vnode);
    return children.indexOf(itemVm.instance());
  } else if (groupVm.type === 'alpine') {
    const children = findChildrenWithProvideAlpine(groupVm.instance<AlpineInstance>(), key, groupVm.el);
    return children.indexOf(itemVm.el as Element);
  } else {
    throw Error(`Unknown instance type ${groupVm.type}`);
  }
}

function findChildrenWithProvideAlpine(
  vm: AlpineInstance,
  key: InjectionKey<any> | symbol,
  el?: Element,
): Element[] {
  if (!el || typeof el !== 'object') return [];

  const provides = (el as any)._provides || {};
  if (Object.getOwnPropertySymbols(provides).includes(key as symbol)) {
    return [el];
  } else {
    return [...el.children].map((c) => findChildrenWithProvideAlpine(vm, key, c)).flat(1);
  }
}

function findChildrenWithProvideVue(
  key: InjectionKey<any> | symbol,
  vnode?: VNodeChild,
): ComponentInternalInstance[] {
  if (!vnode || typeof vnode !== 'object') return [];

  if (Array.isArray(vnode)) {
    return vnode.map((child) => findChildrenWithProvideVue(key, child)).flat(1);
  } else if (vnode.suspense) {
    return findChildrenWithProvideVue(key, vnode.ssContent!);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map((child) => findChildrenWithProvideVue(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key as symbol)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvideVue(key, vnode.component.subTree).flat(1);
    }
  }

  return [];
}

export class CircularBuffer<T = never> {
  readonly #arr: Array<T> = [];
  #pointer = 0;

  constructor(public readonly size: number) {}

  push(val: T) {
    this.#arr[this.#pointer] = val;
    this.#pointer = (this.#pointer + 1) % this.size;
  }

  values(): T[] {
    return this.#arr.slice(this.#pointer).concat(this.#arr.slice(0, this.#pointer));
  }
}

export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export function getEventCoordinates(e: MouseEvent | TouchEvent) {
  if ('touches' in e) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }

  return { clientX: e.clientX, clientY: e.clientY };
}

// Only allow a single return type
type NotAUnion<T> = [T] extends [infer U] ? _NotAUnion<U, U> : never
type _NotAUnion<T, U> = U extends any ? [T] extends [U] ? unknown : never : never

/**
 * Convert a computed ref to a record of refs.
 * The getter function must always return an object with the same keys.
 */
export function destructComputed<T extends object> (
  vm: HeadlessInstance,
  getter: ComputedGetter<T & NotAUnion<T>>,
): ToRefs<T>
// TODO THIS DOESN'T WORK???
// TODO THIS DOESN'T WORK???
// TODO THIS DOESN'T WORK???
// TODO THIS DOESN'T WORK???
// TODO THIS DOESN'T WORK???
export function destructComputed<T extends object>(
  vm: HeadlessInstance,
  getter: ComputedGetter<T>,
) {
  const { computed, ref, toRefs, watchEffect } = vm.reactivity;

  const refs = {} as ToRefs<T>;
  const base = computed(getter);

  for (const key in base.value) {
    refs[key] = computed(() => base.value[key]);
  }

  // watchEffect(() => {
  //   for (const key in base.value) {
  //     if (!(key in refs)) {
  //       refs[key] = ref(base.value[key]);
  //     }
  //     (refs as any)[key] = base.value[key];
  //   }
  // }, { flush: 'sync' });
  return refs;
  // return toRefs(refs);
}

/** Array.includes but value can be any type */
export function includes(arr: readonly any[], val: any) {
  return arr.includes(val);
}

export function eventName(propName: string) {
  return propName[2].toLowerCase() + propName.slice(3);
}

export type EventProp<T extends any[] = any[], F = (...args: T) => void> = F
export const EventProp = <T extends any[] = any[]>() => [Function, Array] as PropType<EventProp<T>>;

export function callEvent<T extends any[]>(handler: EventProp<T> | undefined, ...args: T) {
  if (Array.isArray(handler)) {
    for (const h of handler) {
      h(...args);
    }
  } else if (typeof handler === 'function') {
    handler(...args);
  }
}

export function focusableChildren(el: Element, filterByTabIndex = true) {
  const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', '[tabindex]']
    .map((s) => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ''}:not([disabled])`)
    .join(', ');
  return [...el.querySelectorAll(targets)] as HTMLElement[];
}

export function getNextElement(elements: HTMLElement[], location?: 'next' | 'prev', condition?: (el: HTMLElement) => boolean) {
  let _el;
  let idx = elements.indexOf(document.activeElement as HTMLElement);
  const inc = location === 'next' ? 1 : -1;
  do {
    idx += inc;
    _el = elements[idx];
  } while ((!_el || _el.offsetParent == null || !(condition?.(_el) ?? true)) && idx < elements.length && idx >= 0);
  return _el;
}

export function focusChild(el: Element, location?: 'next' | 'prev' | 'first' | 'last' | number) {
  const focusable = focusableChildren(el);

  if (!location) {
    if (el === document.activeElement || !el.contains(document.activeElement)) {
      focusable[0]?.focus();
    }
  } else if (location === 'first') {
    focusable[0]?.focus();
  } else if (location === 'last') {
    focusable.at(-1)?.focus();
  } else if (typeof location === 'number') {
    focusable[location]?.focus();
  } else {
    const _el = getNextElement(focusable, location);
    if (_el) _el.focus();
    else focusChild(el, location === 'next' ? 'first' : 'last');
  }
}

export function isEmpty(val: any): boolean {
  return val === null || val === undefined || (typeof val === 'string' && val.trim() === '');
}

export function noop() {}

/** Returns null if the selector is not supported or we can't check */
export function matchesSelector(el: Element | undefined, selector: string): boolean | null {
  const supportsSelector = IN_BROWSER &&
    typeof CSS !== 'undefined' &&
    typeof CSS.supports !== 'undefined' &&
    CSS.supports(`selector(${selector})`);

  if (!supportsSelector) return null;

  try {
    return !!el && el.matches(selector);
  } catch (err) {
    return null;
  }
}

export function defer(timeout: number, cb: () => void) {
  if (!IN_BROWSER || timeout === 0) {
    cb();

    return () => {};
  }

  const timeoutId = window.setTimeout(cb, timeout);

  return () => window.clearTimeout(timeoutId);
}

export function eagerComputed<T>(
  vm: HeadlessInstance,
  fn: () => T,
): Readonly<Ref<T>> {
  const { readonly, shallowRef, watchEffect } = vm.reactivity;

  const result = shallowRef();

  watchEffect(() => {
    result.value = fn();
  }, { flush: 'sync' });

  return readonly(result);
}

export function isClickInsideElement(event: MouseEvent, targetDiv: HTMLElement) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const divRect = targetDiv.getBoundingClientRect();
  const divLeft = divRect.left;
  const divTop = divRect.top;
  const divRight = divRect.right;
  const divBottom = divRect.bottom;

  return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
}

export type TemplateRef = {
  (target: Element | ComponentPublicInstance | null): void;
  value: HTMLElement | ComponentPublicInstance | null | undefined;
  readonly el: HTMLElement | undefined;
}
export function templateRef(vm: HeadlessInstance) {
  const { shallowRef } = vm.reactivity;

  const el = shallowRef<HTMLElement | ComponentPublicInstance | null>();
  const fn = (target: HTMLElement | ComponentPublicInstance | null) => {
    el.value = target;
  };
  Object.defineProperty(fn, 'value', {
    enumerable: true,
    get: () => el.value,
    set: (val) => el.value = val,
  });
  Object.defineProperty(fn, 'el', {
    enumerable: true,
    get: () => refElement(el.value),
  });

  return fn as TemplateRef;
}

export const isString = (val: unknown): val is string => typeof val === 'string';
export const isArray = Array.isArray;
export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export function mergeProps(...args: Data[]) {
  const ret: Data = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (
          incoming &&
          existing !== incoming &&
          !(isArray(existing) && existing.includes(incoming))
        ) {
          ret[key] = existing
            ? [].concat(existing as any, incoming as any)
            : incoming;
        }
      } else if (key !== '') {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
};

export function normalizeClass(value: ClassValue): string {
  let res = '';
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + ' ';
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + ' ';
      }
    }
  }
  return res.trim();
}

export type NormalizedStyle = Record<string, string | number>

export function normalizeStyle(
  value: StyleValue,
): NormalizedStyle | string | undefined {
  if (isArray(value)) {
    const res: NormalizedStyle = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item)
        ? parseStringStyle(item)
        : (normalizeStyle(item) as NormalizedStyle);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value as NormalizedStyle;
  } else {
    return undefined;
  }
}

const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {};
  cssText
    .replace(styleCommentRE, '')
    .split(listDelimiterRE)
    .forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
  return ret;
}

export const mapValues = <T extends object, U>(obj: T, mapFn: (val: T[keyof T], key: keyof T) => U) => {
  return Object.entries(obj).reduce((agg, [key, val]) => {
    agg[key as keyof T] = mapFn(val, key as keyof T);
    return agg;
  }, {} as Record<keyof T, U>);
};

export const isPromise = <T = any>(val: any): val is Promise<T> => val && typeof val.then === 'function';
