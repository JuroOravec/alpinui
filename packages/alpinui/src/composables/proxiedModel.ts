// TODO(Alpinui)
// TODO
// TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
//        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
// TODO
// TODO

// Utilities
import { toKebabCase } from '@/util/helpers';

// Types
import type { ComponentInternalInstance, Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';
import type { EventProp } from '@/util/helpers';

type InnerVal<T> = T extends any[] ? Readonly<T> : T

// Composables
export function useProxiedModel<
  Props extends object & { [key in Prop as `onUpdate:${Prop}`]?: EventProp | undefined },
  Prop extends Extract<keyof Props, string>,
  Inner = Props[Prop],
>(
  vm: HeadlessInstance,
  props: Props,
  prop: Prop,
  defaultValue?: Props[Prop],
  transformIn: (value?: Props[Prop]) => Inner = (v: any) => v,
  transformOut: (value: Inner) => Props[Prop] = (v: any) => v,
) {
  const { computed, ref, toRaw, watch } = vm.reactivity;

  const internal = ref(props[prop] !== undefined ? props[prop] : defaultValue) as Ref<Props[Prop]>;

  const isControlled = useIsControlled(vm, props, prop);

  // NOTE(Alpinui): Refactored from `useToggleScope`
  watch(
    [() => !isControlled.value, () => props[prop]] as const,
    ([_, val]) => {
      if (isControlled.value) return;

      internal.value = val;
    }
  );

  const model = computed({
    get(): any {
      const externalValue = props[prop];
      return transformIn(isControlled.value ? externalValue : internal.value);
    },
    set(internalValue) {
      const newValue = transformOut(internalValue);
      const value = toRaw(isControlled.value ? props[prop] : internal.value);
      if (value === newValue || transformIn(value) === internalValue) {
        return;
      }
      internal.value = newValue;
      vm?.emit<any>(`update:${prop}`, newValue);
    },
  }) as any as Ref<InnerVal<Inner>> & { readonly externalValue: Props[Prop] };

  Object.defineProperty(model, 'externalValue', {
    get: () => isControlled.value ? props[prop] : internal.value,
  });

  return model;
}

function useIsControlled<
  Props extends object & { [key in Prop as `onUpdate:${Prop}`]?: EventProp | undefined },
  Prop extends Extract<keyof Props, string>,
>(vm: HeadlessInstance, props: Props, prop: Prop) {
  const { computed } = vm.reactivity;

  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;

  // Orig Vue implementation - we check both kebab and normal prop names
  if (vm.type === 'vue') {
    const vnode = vm.instance<ComponentInternalInstance>().vnode;

    return checkKebab
      ? computed(() => {
        void props[prop];
        return !!(
          (vnode.props?.hasOwnProperty(prop) || vnode.props?.hasOwnProperty(kebabProp)) &&
          (vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`))
        );
      })
      : computed(() => {
        void props[prop];
        return !!(vnode.props?.hasOwnProperty(prop) && vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
      });
  } else if (vm.type === 'alpine') {
    // AlpineJS implementation - we check both kebab and normal prop names
    return computed(() => {
      void props[prop];
      return !!(vm.props?.hasOwnProperty(prop) && vm.props?.hasOwnProperty(`onUpdate:${prop}`));
    });
  } else {
    throw Error(`Unknown instance type ${vm.type}`);
  }
}
