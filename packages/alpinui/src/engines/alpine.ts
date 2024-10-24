// Utilities
import {
  computed,
  isRef,
  reactive,
  readonly,
  ref,
  shallowRef,
  stop,
  toRaw,
  toRef,
  toRefs,
  unref,
  watch,
  watchEffect,
  writableComputed,
} from 'alpine-reactivity';
import { isFunction, isPromise, mergeProps } from '@/util/helpers';

// Types
import type {
  AlpineInstance,
  ComponentOptions,
  Data,
} from 'alpine-composition';
import type { WatchStopHandle } from 'alpine-reactivity';
import type _Alpine from 'alpinejs';
import type { DirectiveCallback } from 'alpinejs';
import type { EmitsOptions } from 'vue';
import type { HeadlessComponentOptions, HeadlessDirective, HeadlessDirectiveBinding, HeadlessInstance, HeadlessReactivity } from './types';
import { getIcons } from './util/icons';

const createAlpineReactivity = (
  instance: AlpineInstance<any, any, any>,
): HeadlessReactivity => {
  const reactives: any[] = [];
  const effects: any[] = [];
  const watches: (() => void)[] = [];
  const onBeforeUpdatedCallbacks: (() => void)[] = [];
  const onUpdatedCallbacks: (() => void)[] = [];

  let stopUpdateWatcher: WatchStopHandle | null = null;
  let isUpdateWatcherInit = false;
  const createUpdateWatcher = () => {
    // Stop previous watcher
    stopUpdateWatcher?.();
    isUpdateWatcherInit = true;

    // And create new one, which watches ALL reactives
    stopUpdateWatcher = watchEffect(() => {
      for (const reactive of reactives) {
        // "touch" each variable
        unref(reactive);
      }

      // Also touch all props
      for (const propKey of Object.keys(instance.$props)) {
        // "touch" each variable
        instance.$props[propKey]; /* eslint-disable-line no-unused-expressions */
      }

      // Since we touch ALL reactive variables, when this function
      // is re-run, we know that it's because a) new variable was added,
      // or b) the values actually changed.
      if (isUpdateWatcherInit) {
        isUpdateWatcherInit = false;
        return;
      }

      // So if we got here, some values changed, so trigger the hooks
      onBeforeUpdatedCallbacks.forEach((cb) => cb());
      instance.$nextTick(() => {
        onUpdatedCallbacks.forEach((cb) => cb());
      });
    });
  };

  const trackRef = (r: any) => {
    reactives.push(r);
    createUpdateWatcher();
  };

  // Cleanup
  instance.$onBeforeUnmount(() => {
    // Wait a tick, so normal execution of AlpineJS' `destroy` hook proceeds
    // normally (assuming it's synchronous).
    setTimeout(() => {
      effects.forEach((eff) => stop(eff));
      watches.forEach((stopWatch) => stopWatch());
      stopUpdateWatcher?.();
    });
  });

  return {
    computed: <T>(getterOrOptions: any) => {
      const onlyGetter = isFunction(getterOrOptions);
      const val = onlyGetter
        ? computed<T>(getterOrOptions)
        : writableComputed<T>(getterOrOptions);

      trackRef(val);
      // @ts-expect-error
      effects.push(val.effect);
      return val as any;
    },
    inject: (...args: any[]) => {
      // @ts-expect-error
      return instance.$inject(...args);
    },
    // @ts-expect-error
    isRef: <T>(r: any, ...args: any[]) => {
      // @ts-expect-error
      return isRef<T>(r, ...args);
    },
    // NOTE: mergeProps does NOT use any reactivity API
    mergeProps: (...args: any[]) => {
      return mergeProps(...args);
    },
    nextTick: (...args: any[]) => {
      return instance.$nextTick(...args) as any;
    },
    provide: (key, val) => {
      return instance.$provide(key, val);
    },
    reactive: <T extends object>(val: any) => {
      const reactiveVal = reactive<T>(val);

      const refs = toRefs(reactiveVal);
      Object.values(refs).forEach((refVal) => {
        trackRef(refVal);
      });

      return reactiveVal;
    },
    readonly: (val: any) => {
      return readonly(val);
    },
    ref: <T>(...args: any[]) => {
      const val = ref<T>(...args);
      trackRef(val);
      return val as any;
    },
    shallowRef: <T>(...args: any[]) => {
      const val = shallowRef<T>(...args);
      trackRef(val);
      return val as any;
    },
    toRaw: (val: any) => {
      return toRaw(val);
    },
    toRef: (...args: any[]) => {
      // @ts-expect-error
      const val = toRef(...args);
      trackRef(val);
      return val as any;
    },
    toRefs: <T extends object>(val: T) => {
      const refs = toRefs(val);
      Object.values(refs).forEach((refVal) => {
        trackRef(refVal);
      });
      return refs as any;
    },
    unref: (val: any) => {
      return unref(val);
    },
    watch: (...args: any[]) => {
      // @ts-expect-error
      const stopHandle = watch(...args);
      watches.push(stopHandle);
      return stopHandle;
    },
    watchEffect: (...args: any[]) => {
      // @ts-expect-error
      const stopHandle = watchEffect(...args);
      watches.push(stopHandle);
      return stopHandle;
    },

    onBeforeMount: (cb) => cb(), // Run the callback immediately
    onMounted: (cb) => cb(), // Run the callback immediately
    onBeforeUnmount: instance.$onBeforeUnmount,
    onUnmounted: instance.$onBeforeUnmount,
    onBeforeUpdate: (cb) => onBeforeUpdatedCallbacks.push(cb),
    onUpdated: (cb) => onUpdatedCallbacks.push(cb),
    onActivated: () => {}, // NOOP
    onDeactivated: () => {}, // NOOP
  };
};

const createAlpineHeadlessInstance = <
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
  S extends Record<string, any> = Record<string, any>,
>(
    instance: AlpineInstance<T, P, E>,
  ): HeadlessInstance<P, E, S> => {
  // NOTE: All of our AlpineJS components instances should be given an info
  // on which slots have been filled and which not. Since we have to pass that
  // info ourselves, we validate it.
  if (!instance.$initState.slots) {
    /* eslint-disable-next-line */
    console.warn('[Alpinui]: AlpineJS component is missing slots metadata');
  }

  let isUnmounted = false;
  instance.$onBeforeUnmount(() => {
    isUnmounted = true;
  });

  return {
    type: 'alpine',

    get name() {
      return instance.$name;
    },
    get aliasName() {
      return instance.$aliasName;
    },
    get props() {
      return instance.$props;
    },
    get attrs() {
      return instance.$attrs;
    },
    get refs() {
      return instance.$refs;
    },
    get el() {
      return instance.$el;
    },
    get provides() {
      // @ts-expect-error
      return instance.$el._provides;
    },
    get isUnmounted() {
      return readonly(isUnmounted);
    },
    get hasSlots() {
      return { ...instance.$initState.slots as Record<keyof S, boolean> };
    },
    get icons() {
      return { ...getIcons().icons };
    },
    get iconFallbackSet() {
      return { ...getIcons().fallbackIconset }; ;
    },

    propIsDefined: (prop: string) => {
      return prop in instance.$props;
    },
    resolveDynamicComponent: (comp: string) => {
      return null;
    },

    emit: instance.$emit,
    instance: <T>() => instance as T,
    reactivity: createAlpineReactivity(instance),
  };
};

export function defineAlpineComponent<
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
  RI extends Data = Data,
  S extends Record<string, any> = Record<string, any>,
>({
  setupHeadless,
  // NOTE: render FN is ignored in AlpineJS
  renderHeadless,
  ...options
}: HeadlessComponentOptions<T, P, E, RI, S>): ComponentOptions<T & RI, P, E> {
  return {
    ...options,
    setup(props, instance) {
      const headless = createAlpineHeadlessInstance<T & RI, P, E, S>(instance);
      const {
        expose,
        renderInput,
      } = setupHeadless(props, headless);

      if (isPromise<T>(expose)) {
        return expose.then((d) => ({
          ...renderInput,
          ...d,
        }));
      }

      return {
        ...renderInput,
        ...expose,
      };
    },
  };
};

export const createAlpineDirective = <T, MOD extends Record<string, boolean>>({
  mounted,
  updated,
  unmounted,
}: HeadlessDirective<T, MOD>) => {
  const alpineDirective: DirectiveCallback = (el, directive, utils) => {
    const modifiers = directive.modifiers.reduce((agg, key) => ({
      ...agg,
      key: true,
    }), {} as MOD);

    const getOptions = utils.Alpine.evaluateLater<HeadlessDirectiveBinding<T, MOD>['value']>(el, directive.expression);

    let oldValue: HeadlessDirectiveBinding<T, MOD>['value'];
    let wasEnabled = false;

    const withState = (cb: (state: HeadlessDirectiveBinding<T, MOD>) => void) => {
      getOptions((value) => {
        // NOTE: Vue and AlpineJS have slightly different naming conventions
        //   - Vue's value     == Alpine's expression
        //   - Vue's arg       == Alpine's value
        //   - Vue's modifiers == Alpine's modifiers
        // See https://alpinejs.dev/advanced/extending#method-signature
        const state: HeadlessDirectiveBinding<T, MOD> = {
          value,
          oldValue,
          modifiers,
          arg: directive.value,
        };
        return cb(state);
      });
    };

    utils.effect(() => {
      withState((state) => {
        if (!wasEnabled) {
          mounted(el, state);
          wasEnabled = true;
        } else {
          updated?.(el, state);
        }

        oldValue = state.value;
      });
    });

    utils.cleanup(() => {
      withState((state) => {
        unmounted(el, state);
      });
    });
  };

  return alpineDirective;
};

export const createAlpineComposable = <TArgs extends any[], TRes extends any>(
  fn: (vm: HeadlessInstance, ...args: TArgs) => TRes,
): (vm: AlpineInstance<any, any, any>, ...args: TArgs) => TRes => {
  return (vm, ...args: TArgs) => {
    const headless = createAlpineHeadlessInstance(vm);
    return fn(headless, ...args);
  };
};
