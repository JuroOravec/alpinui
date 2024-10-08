// Types
import type { Alpine as _AlpineType } from 'alpinejs';
import type { Magics } from 'alpinejs';
import type {
  ComponentObjectPropsOptions,
  EmitsOptions,
  ObjectEmitsOptions,
  InjectionKey,
} from 'vue';

import type { EmitsToProps, EmitKeys, EmitsToEmitFns } from './emit';
import type { ReactivityAPI } from './reactivity';

declare module 'alpinejs' {
  export interface Magics<T> {
    // These magics come from alpine-provide-inject
    $provide: <T, K = InjectionKey<T> | string | number>(
      key: K,
      value: K extends InjectionKey<infer V> ? V : T
    ) => void;
    $inject: <T = any>(key: InjectionKey<T> | string, defaultVal?: T) => T;
  }
}

export type AlpineType = _AlpineType;

export type Data = Record<string, any>;

export interface AlpineInstance <
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
> extends Magics<P> {
  /** Name of the component. */
  $name: Readonly<string>;
  /** Props passed to the component as reactive object. */
  $props: Readonly<P>;
  /** HTML attributes (as object) of the element where the `x-data` was defined. */
  $attrs: Readonly<Record<string, string | true>>;
  /** Initial component definition. */
  $options: Readonly<ComponentOptions<T, P, E>>;
  /**
   * Normalized declaration of custom events emitted by the component.
   *
   * See https://vuejs.org/api/options-state.html#emits
   */
  $emitsOptions: Readonly<ObjectEmitsOptions>;
  /**
   * Vue-like `emit()` method. Unlike `$dispatch`, `$emit` expects event handlers
   * to be set as props (e.g. `onClickButton` or `onClickButtonOnce` for event
   * `clickButton`).
   *
   * Thus, handlers for events emitted with `$emit()` must be explicitly defined
   * on the component that emits that event. In other words, the even does NOT
   * bubble up. When no event handler is passed as a prop, the event is NOT sent. 
   */
  $emit: <K extends EmitKeys<E>>(
    name: K,
    ...args: Parameters<Exclude<EmitsToEmitFns<E>[K], undefined>>
  ) => void;
  $onBeforeUnmount: (cb: () => void) => void;
  init: (this: Magics<Data>) => void;
  destroy: (this: Magics<Data>) => void;
}

export interface ComponentOptions <
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
> {
  [key: string]: any;
  name: string;
  props: ComponentObjectPropsOptions<P>;
  /**
   * Declare the custom events emitted by the component.
   * 
   * See https://vuejs.org/api/options-state.html#emits
   */
  emits?: E;
  setup: (
    props: Readonly<P & EmitsToProps<E>>,
    vm: AlpineInstance<T, P, E>,
    reactivity: ReactivityAPI,
    ...args: any[]
  ) => T | Promise<T>;
  /** If `isolated`, the component DOES NOT have access to variables defined in parent components. */
  isolated?: boolean;
  /**
   * Initial component state can be passed to the component as JSON via `data-x-init` HTML attribute.
   * Change this option to override which `data-x-` key will be used.
   */
  initKey?: string;
}

/** Convert ComponentOptions to AlpineInstance */
export type AlpineInstanceFromOptions <T extends ComponentOptions<any, any, any>> =
  T extends ComponentOptions<infer U, infer V, infer W>
    ? AlpineInstance<U, V, W>
    : never;
