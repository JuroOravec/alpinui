// Utilities
import {
  computed,
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
  Component,
  ComponentInternalInstance,
  ComponentObjectPropsOptions,
  ComputedOptions,
  DirectiveBinding,
  EmitsOptions,
  MethodOptions,
  ObjectDirective,
  Slots,
} from 'vue';
import type { HeadlessComponentOptions, HeadlessDirective, HeadlessDirectiveBinding, HeadlessInstance, HeadlessReactivity } from './types';

const createVueReactivity = (): HeadlessReactivity => {
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

const createVueHeadlessInstance = <
  P extends {} = any,
  E extends EmitsOptions = EmitsOptions,
>(
    instance: ComponentInternalInstance
  ): HeadlessInstance<P, E> => {
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

    emit: instance.emit,
    instance: <T>() => instance as T,
    reactivity: createVueReactivity(),

    propIsDefined: (prop: string) => {
      const vnode = instance.vnode;
      return typeof vnode.props?.[prop] !== 'undefined' ||
        typeof vnode.props?.[toKebabCase(prop)] !== 'undefined';
    },

    resolveDynamicComponent: (comp: string) => {
      return resolveDynamicComponent('RouterLink');
    },
  };
};

export const defineVueComponent = <
  T extends {} = any,
  P extends {} = any,
  E extends EmitsOptions = EmitsOptions,
  RI extends {} = any,
  S extends Slots = Slots,
>({
    setupHeadless,
    renderHeadless,
    exposeDefaults,
    slots,
    ...options
  }: HeadlessComponentOptions<T, P, E, RI, S>
  ): Component<
    ComponentObjectPropsOptions<P>, // Props
    T, // RawBindings
    {}, // Data
    ComputedOptions, // Computed
    MethodOptions, // Methods
    E, // Emit Options
    S // Slots
  > => ({
    ...options,
    setup(props, { slots }) {
      const instance = getCurrentInstance()!;
      const headless = createVueHeadlessInstance<P, E>(instance);
      const {
        expose,
        renderInput,
      } = setupHeadless(props as any, headless);

      useRender(instance, () => {
        return renderHeadless(headless, renderInput, slots as S);
      });

      return {
        ...expose,
      };
    },
  });

type VueDirectiveBinding<T, MOD extends Record<string, boolean>> = Omit<
  DirectiveBinding,
  'modifiers' | 'value' | 'oldValue'
> & Pick<
  HeadlessDirectiveBinding<T, MOD>,
  'modifiers' | 'value' | 'oldValue'
>;

export const createVueDirective = <T, MOD extends Record<string, boolean>>({
  mounted,
  updated,
  unmounted,
}: HeadlessDirective<T, MOD>) => {
  return {
    mounted: (el, binding) => mounted(el, binding as VueDirectiveBinding<T, MOD>),
    updated: (el, binding) => updated?.(el, binding as VueDirectiveBinding<T, MOD>),
    unmounted: (el, binding) => unmounted(el, binding as VueDirectiveBinding<T, MOD>),
  } satisfies ObjectDirective<HTMLElement, T>;
};
