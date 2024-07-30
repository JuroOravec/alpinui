// Types
import type { Alpine as _AlpineType } from 'alpinejs';
import type { Magics } from 'alpinejs';
import type { ComponentObjectPropsOptions } from 'vue';

import type { EmitsToProps, EmitKeys, EmitsToEmitFns, EmitsOptions, ObjectEmitsOptions } from './emit';

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>
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
  props: RequiredNotNull<ComponentObjectPropsOptions<P>>;
  /**
   * Declare the custom events emitted by the component.
   * 
   * See https://vuejs.org/api/options-state.html#emits
   */
  emits?: E;
  setup: (props: Readonly<P & EmitsToProps<E>>, vm: AlpineInstance<T, P, E>, ...args: any[]) => T;
}
