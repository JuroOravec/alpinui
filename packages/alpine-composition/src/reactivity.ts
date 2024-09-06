import type { WatchStopHandle } from "alpine-reactivity";
import type { AlpineInstance } from "./types";
import type {
  computed as vueComputed,
  inject as vueInject,
  isRef as vueIsRef,
  mergeProps as vueMergeProps,
  nextTick as vueNextTick,
  provide as vueProvide,
  reactive as vueReactive,
  readonly as vueReadonly,
  ref as vueRef,
  shallowRef as vueShallowRef,
  toRaw as vueToRaw,
  toRef as vueToRef,
  toRefs as vueToRefs,
  unref as vueUnref,
  watch as vueWatch,
  watchEffect as vueWatchEffect,
} from 'vue';

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
import { isFunction, mergeProps } from "./utils";


/** Public API of vue-reactivity that's fulfilled by alpine-composition */
export interface ReactivityAPI {
  computed: typeof vueComputed;
  inject: typeof vueInject;
  isRef: typeof vueIsRef;
  mergeProps: typeof vueMergeProps;
  nextTick: typeof vueNextTick;
  provide: typeof vueProvide;
  reactive: typeof vueReactive;
  readonly: typeof vueReadonly;
  ref: typeof vueRef;
  shallowRef: typeof vueShallowRef;
  toRaw: typeof vueToRaw;
  toRef: typeof vueToRef;
  toRefs: typeof vueToRefs;
  unref: typeof vueUnref;
  watch: typeof vueWatch;
  watchEffect: typeof vueWatchEffect;

  // Lifecycle hooks used by Vuetify.
  // See https://vuejs.org/api/composition-api-lifecycle
  onBeforeMount: (cb: () => void) => void;
  onMounted: (cb: () => void) => void;
  onBeforeUnmount: (cb: () => void) => void;
  onUnmounted: (cb: () => void) => void;
  onBeforeUpdate: (cb: () => void) => void;
  onUpdated: (cb: () => void) => void;
  onActivated: (cb: () => void) => void;
  onDeactivated: (cb: () => void) => void;
}

export const createReactivityAPI = (
  instance: AlpineInstance<any, any, any>,
): ReactivityAPI => {
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
    // @ts-expect-error
    provide: (key: string, val: any) => {
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

    onBeforeMount: (cb: any) => cb(), // Run the callback immediately
    onMounted: (cb: any) => cb(), // Run the callback immediately
    onBeforeUnmount: instance.$onBeforeUnmount,
    onUnmounted: instance.$onBeforeUnmount,
    onBeforeUpdate: (cb: any) => onBeforeUpdatedCallbacks.push(cb),
    onUpdated: (cb: any) => onUpdatedCallbacks.push(cb),
    onActivated: () => {}, // NOOP
    onDeactivated: () => {}, // NOOP
  };
};
