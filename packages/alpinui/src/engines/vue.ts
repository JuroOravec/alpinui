// Utilities
import {
  computed,
  defineComponent, // eslint-disable-line no-restricted-imports
  getCurrentInstance,
  inject,
  isRef,
  mergeProps,
  nextTick,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  readonly,
  ref,
  resolveDynamicComponent,
  shallowRef,
  toRaw,
  toRef,
  toRefs,
  unref,
  watch,
  watchEffect,
} from 'vue';
import { toKebabCase } from '@/util/helpers';
import { useRender } from '@/util/useRender';

// Types
import type {
  ComponentInternalInstance,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  DirectiveBinding,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  MethodOptions,
  ObjectDirective,
  ObjectEmitsOptions,
  PublicProps,
  SlotsType,
  VNode,
  VNodeChild,
} from 'vue';
import type {
  HeadlessComponentOptions,
  HeadlessDirective,
  HeadlessDirectiveBinding,
  HeadlessInstance,
  HeadlessReactivity,
  RawSlots,
} from './types';
import { getIcons } from './util/icons';
import type { FilterPropsOptions } from '@/util/defineComponent';

export const createVueReactivity = (): HeadlessReactivity => {
  return {
    computed,
    inject,
    isRef,
    mergeProps,
    nextTick,
    provide,
    reactive,
    readonly,
    ref,
    shallowRef,
    toRaw,
    toRef,
    toRefs,
    unref,
    watch,
    watchEffect,

    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    onUnmounted,
    onBeforeUpdate,
    onUpdated,
    onActivated,
    onDeactivated,
  };
};

export const createVueHeadlessInstance = <
  P extends {} = any,
  E extends EmitsOptions = EmitsOptions,
  S extends Record<string, any> = Record<string, any>,
>(
    instance: ComponentInternalInstance,
  ): HeadlessInstance<P, E, S> => {
  return {
    type: 'vue',

    get name() {
      return instance.type.name;
    },
    get aliasName() {
      return instance.type.aliasName;
    },
    get props() {
      return instance.props as any;
    },
    get attrs() {
      return instance.attrs as any;
    },
    get refs() {
      return instance.refs as any;
    },
    get el() {
      return instance.refs.el as HTMLElement;
    },
    get provides() {
      return instance.provides;
    },
    get isUnmounted() {
      return instance.isUnmounted;
    },
    get icons() {
      return { ...getIcons().icons };
    },
    get iconFallbackSet() {
      return { ...getIcons().fallbackIconset }; ;
    },

    // Proxy for slots object that doesn't return the slots themselves,
    // but returns only whether the slot is truthy (AKA defined and non-null).
    hasSlots: new Proxy(
      instance.slots,
      {
        get(target, prop, receiver) {
          return !!Reflect.get(target, prop, receiver);
        },
      }
    ) as any as Record<keyof S, boolean>,

    emit: instance.emit,
    instance: <T>() => instance as T,
    reactivity: createVueReactivity(),

    propIsDefined: (prop: string) => {
      const vnode = instance.vnode;
      return (
        typeof vnode.props?.[prop] !== 'undefined' ||
        typeof vnode.props?.[toKebabCase(prop)] !== 'undefined'
      );
    },

    resolveDynamicComponent: (comp: string) => {
      return resolveDynamicComponent('RouterLink');
    },
  };
};

type ResolveProps<PropsOrPropOptions, E extends EmitsOptions> = Readonly<
  PropsOrPropOptions extends ComponentPropsOptions
    ? ExtractPropTypes<PropsOrPropOptions>
    : PropsOrPropOptions
> &
({} extends E ? {} : EmitsToProps<E>);

export function defineVueComponent<
  T extends {} = any,
  P extends ComponentObjectPropsOptions = any,
  E extends EmitsOptions = EmitsOptions,
  RI extends {} = any,
  S extends Record<string, any> = Record<string, any>,
>({
  setupHeadless,
  renderHeadless,
  exposeDefaults,
  slots,
  ...options
}: HeadlessComponentOptions<T, P, E, RI, S>): DefineComponent<
  P, // Props
  T, // RawBindings
  {}, // Data
  ComputedOptions, // Computed
  MethodOptions, // Methods
  ComponentOptionsMixin, // mixins
  ComponentOptionsMixin, // extends
  E, // Emit Options
  string, // EE
  PublicProps, // PublicProps
  ResolveProps<P, E>, // Props
  ExtractDefaultPropTypes<P>, // Defaults
  S // Slots
> & FilterPropsOptions<P> {
  return defineComponent({
    ...options,
    setup(props, { slots, attrs }) {
      const instance = getCurrentInstance()!;
      const headless = createVueHeadlessInstance<ExtractPropTypes<P>, E, S>(
        instance,
      );
      const { expose, renderInput } = setupHeadless(props as any, headless);

      useRender(instance, () => {
        return renderHeadless(headless, renderInput, {
          attrs,
          props: props as ExtractPropTypes<P>,
          slots: slots as S,
        });
      });

      return expose;
    },
  }) as any;
}

type VueDirectiveBinding<T, MOD extends Record<string, boolean>> = Omit<
  DirectiveBinding,
  'modifiers' | 'value' | 'oldValue'
> &
Pick<HeadlessDirectiveBinding<T, MOD>, 'modifiers' | 'value' | 'oldValue'>;

export const createVueDirective = <T, MOD extends Record<string, boolean>>({
  mounted,
  updated,
  unmounted,
}: HeadlessDirective<T, MOD>) => {
  return {
    mounted: (el, binding) =>
      mounted(el, binding as VueDirectiveBinding<T, MOD>),
    updated: (el, binding) =>
      updated?.(el, binding as VueDirectiveBinding<T, MOD>),
    unmounted: (el, binding) =>
      unmounted(el, binding as VueDirectiveBinding<T, MOD>),
  } satisfies ObjectDirective<HTMLElement, T>;
};

export const createVueComposable = <TArgs extends any[], TRes extends any>(
  fn: (vm: HeadlessInstance, ...args: TArgs) => TRes,
): ((...args: TArgs) => TRes) => {
  const instance = getCurrentInstance()!;
  const headless = createVueHeadlessInstance(instance);

  return (...args: TArgs) => fn(headless, ...args);
};

// //////////////////////////////////////
// Types for `genericVueComponent` (formerly `genericComponent`)
// //////////////////////////////////////

type ToListeners<T extends string | number | symbol> = { [K in T]: K extends `on${infer U}` ? Uncapitalize<U> : K }[T]

export type SlotsToProps<
  U extends RawSlots,
  T = MakeInternalSlots<U>
> = {
  $children?: (
    | VNodeChild
    | (T extends { default: infer V } ? V : {})
    | { [K in keyof T]?: T[K] }
  );
  'v-slots'?: { [K in keyof T]?: T[K] | false };
} & {
  [K in keyof T as `v-slot:${K & string}`]?: T[K] | false
}

type Slot<T> = [T] extends [never] ? () => VNodeChild : (arg: T) => VNodeChild
type VueSlot<T> = [T] extends [never] ? () => VNode[] : (arg: T) => VNode[]
type MakeInternalSlots<T extends RawSlots> = {
  [K in keyof T]: Slot<T[K]>
}
type MakeSlots<T extends RawSlots> = {
  [K in keyof T]: VueSlot<T[K]>
}

export type GenericProps<Props, Slots extends Record<string, unknown>> = {
  $props: Props & SlotsToProps<Slots>;
  $slots: MakeSlots<Slots>;
}

type ComponentConstructor = (new (props: Record<string, any>, slots: RawSlots) => {
  $props?: Record<string, any>;
});

type _ResolveGenericEmits<
  T extends ComponentConstructor,
  E extends EmitsOptions
> = E extends any[]
  ? E
  : InstanceType<T> extends Record<'$props', any>
    ? Omit<E, ToListeners<keyof InstanceType<T>['$props']>>
    : E;

type _ResolveGenericProps<
  T extends ComponentConstructor,
  PropsOptions extends Readonly<ComponentObjectPropsOptions>,
> = InstanceType<T> extends Record<'$props', any>
  ? Omit<PropsOptions, keyof InstanceType<T>['$props']>
  : PropsOptions;

type _ExtractGenericSlots<
  T extends ComponentConstructor,
> = ConstructorParameters<T>[1];

// This type accepts a ComponentConstructor that defines the slots and
// _additional_ props.
type DefineComponentWithGenericProps<T extends ComponentConstructor> = <
  PropsOptions extends Readonly<ComponentObjectPropsOptions>,
  RawBindings extends {} = any,
  E extends EmitsOptions = EmitsOptions,
  // RenderInputs - Data that's returned from `setup`, and used in rendering
  // but is not exposed publicly from the component.
  RI extends {} = {},
  S extends RawSlots = RawSlots,
>(
  options: HeadlessComponentOptions<RawBindings, PropsOptions, E, RI, S>
) => DefineComponent<
  _ResolveGenericProps<T, PropsOptions>,
  RawBindings,
  {}, // Data
  ComputedOptions, // Computed
  MethodOptions, // Methods
  ComponentOptionsMixin, // Mixins
  ComponentOptionsMixin, // Extends
  _ResolveGenericEmits<T, E>,
  string, // 'EE'
  PublicProps,
  ExtractPropTypes<_ResolveGenericProps<T, PropsOptions>> & ({} extends E ? {} : EmitsToProps<_ResolveGenericEmits<T, E>>),
  ExtractDefaultPropTypes<_ResolveGenericProps<T, PropsOptions>>,
  SlotsType<Partial<MakeSlots<_ExtractGenericSlots<T> & S>>>
> & T & FilterPropsOptions<PropsOptions>

type DefineComponentWithSlots<Slots extends RawSlots> = <
  PropsOptions extends Readonly<ComponentObjectPropsOptions>,
  RawBindings extends {} = any,
  E extends EmitsOptions = EmitsOptions,
  // RenderInputs - Data that's returned from `setup`, and used in rendering
  // but is not exposed publicly from the component.
  RI extends {} = {},
  S extends RawSlots = RawSlots,
>(
  options: HeadlessComponentOptions<RawBindings, PropsOptions, E, RI, S>
) => DefineComponent<
  ExtractPropTypes<PropsOptions> & SlotsToProps<Slots>,
  RawBindings,
  {}, // Data
  ComputedOptions, // Computed
  MethodOptions, // Methods
  ComponentOptionsMixin, // Mixins
  ComponentOptionsMixin, // Extends
  E,
  string, // 'EE'
  PublicProps,
  ExtractPropTypes<PropsOptions> & SlotsToProps<Slots> & ({} extends E ? {} : EmitsToProps<E>),
  ExtractDefaultPropTypes<PropsOptions>,
  SlotsType<Partial<MakeSlots<Slots & S>>>
> & FilterPropsOptions<PropsOptions>

// No argument - simple default slot
export function genericVueComponent (): DefineComponentWithSlots<{ default: never }>

// Generic constructor argument - generic props and slots
export function genericVueComponent<T extends (new (props: Record<string, any>, slots: any) => {
  $props?: Record<string, any>;
})> (): DefineComponentWithGenericProps<T>

// Slots argument - simple slots
export function genericVueComponent<
  Slots extends RawSlots
> (): DefineComponentWithSlots<Slots>

// Implementation
export function genericVueComponent() {
  return (options: any) => defineVueComponent(options) as any;
}

type EmitsToProps<T extends EmitsOptions> = T extends string[]
  ? {
    [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any
  }
  : T extends ObjectEmitsOptions
    ? {
      [K in string &
        `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
        ? T[Uncapitalize<C>] extends null
          ? (...args: any[]) => any
          : (
            ...args: T[Uncapitalize<C>] extends (...args: infer P) => any
              ? P
              : never
          ) => any
        : never
    }
    : {}
