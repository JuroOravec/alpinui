// Types
import type { ComponentOptions, Data, EmitsOptions } from 'alpine-composition';
import type {
  EmitKeys,
  EmitsToEmitFns,
  EmitsToProps,
} from 'alpine-composition/dist/cjs/emit';
import type _Alpine from 'alpinejs';
import type {
  Slots,
  VNode,
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

export interface HeadlessComponentOptions<
  T extends Data,
  P extends Data,
  E extends EmitsOptions,
  RI extends Data,
  S extends Slots,
> extends Pick<ComponentOptions<T, P, E>, 'name' | 'props' | 'emits'> {
  [key: string]: unknown;
  aliasName?: string;
  exposeDefaults?: boolean;
  slots?: S;
  setupHeadless: (
    props: Readonly<P & EmitsToProps<E>>,
    vm: HeadlessInstance<P, E>,
  ) => {
    expose: T;
    renderInput: RI;
  };
  renderHeadless: (vm: HeadlessInstance<P, E>, renderInput: RI, slots: S) => VNode | VNode[] | null;
}

export interface HeadlessInstance<
  P extends Data = any,
  E extends EmitsOptions = any,
> {
  type: 'vue' | 'alpine';

  /** Name of the component. */
  name: Readonly<string | undefined>;
  aliasName: Readonly<string | undefined>;
  /** Props passed to the component as reactive object. */
  props: Readonly<P>;
  /** HTML attributes (as object) of the element where the `x-data` was defined. */
  attrs: Readonly<Record<string, string | true>>;
  /** Record of DOM elements marked with `x-ref` inside the component. */
  refs: Record<string, HTMLElement>;
  /** The current HTMLElement that triggered this expression. */
  el: HTMLElement | undefined;
  provides: Record<string, unknown>;

  /**
   * Vue-like `emit()` method. Unlike `$dispatch`, `$emit` expects event handlers
   * to be set as props (e.g. `onClickButton` or `onClickButtonOnce` for event
   * `clickButton`).
   *
   * Thus, handlers for events emitted with `$emit()` must be explicitly defined
   * on the component that emits that event. In other words, the even does NOT
   * bubble up. When no event handler is passed as a prop, the event is NOT sent.
   */
  emit: <K extends EmitKeys<E>>(
    name: K,
    ...args: Parameters<Exclude<EmitsToEmitFns<E>[K], undefined>>
  ) => void;

  instance: <T>() => T;
  reactivity: HeadlessReactivity;

  propIsDefined: (prop: string) => boolean;
  resolveDynamicComponent: (comp: string) => any;
}

export interface HeadlessReactivity {
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

export interface HeadlessDirectiveBinding<
  T,
  MOD extends object = Partial<Record<string, boolean>>,
> {
  /**
   * The value passed to the directive. For example in `v-my-directive="1 + 1"`,
   * the value would be `2`.
   */
  value?: T;
  /**
   * The previous value, only available in updated. It is available whether
   * or not the value has changed.
   */
  oldValue?: T;
  /**
   * The argument passed to the directive, if any. For example in `v-my-directive:foo`,
   * the arg would be `"foo"`.
   */
  arg?: string;
  /**
   * An object containing modifiers, if any. For example in `v-my-directive.foo.bar`,
   * the modifiers object would be `{ foo: true, bar: true }`.
   */
  modifiers: MOD;
}

export interface HeadlessDirective <
  T,
  MOD extends object = Partial<Record<string, boolean>>,
> {
  mounted: (el: HTMLElement, binding: HeadlessDirectiveBinding<T, MOD>) => void;
  updated?: (el: HTMLElement, binding: HeadlessDirectiveBinding<T, MOD>) => void;
  unmounted: (el: HTMLElement, binding: HeadlessDirectiveBinding<T, MOD>) => void;
};
