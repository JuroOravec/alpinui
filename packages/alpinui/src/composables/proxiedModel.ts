// Utilities
import { computed, ref, toRaw, watch, writableComputed } from 'alpine-reactivity';
import { toKebabCase } from '@/util/helpers';

// Types
import type { AlpineInstance, Data, EmitsOptions } from 'alpine-composition';
import type { Ref } from 'alpine-reactivity';
import type { EventProp } from '@/util/helpers';

type InnerVal<T> = T extends any[] ? Readonly<T> : T

// TODO
// TODO
// TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
//        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
// TODO
// TODO

// Composables
export function useProxiedModel<
  Props extends object & { [key in Prop as `onUpdate:${Prop}`]: EventProp | undefined },
  Prop extends Extract<keyof Props, string>,
  Inner = Props[Prop],
>(
  vm: AlpineInstance<Data, Data, EmitsOptions>,
  props: Props,
  prop: Prop,
  defaultValue?: Props[Prop],
  transformIn: (value?: Props[Prop]) => Inner = (v: any) => v,
  transformOut: (value: Inner) => Props[Prop] = (v: any) => v,
) {
  const internal = ref(props[prop] !== undefined ? props[prop] : defaultValue) as Ref<Props[Prop]>;
  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;

  const isControlled = checkKebab
    ? computed(() => {
      void props[prop];
      return !!(
        (vm.$props?.hasOwnProperty(prop) || vm.$props?.hasOwnProperty(kebabProp)) &&
        (vm.$props?.hasOwnProperty(`onUpdate:${prop}`) || vm.$props?.hasOwnProperty(`onUpdate:${kebabProp}`))
      );
    })
    : computed(() => {
      void props[prop];
      return !!(vm.$props?.hasOwnProperty(prop) && vm.$props?.hasOwnProperty(`onUpdate:${prop}`));
    });

  watch([() => props[prop], isControlled] as const, ([propVal, newIsControlled]) => {
    if (newIsControlled) return;

    internal.value = propVal;
  });

  const model = writableComputed({
    get() {
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
      vm?.$dispatch(`update:${prop}`, newValue);
    },
  }) as any as Ref<InnerVal<Inner>> & { readonly externalValue: Props[Prop] };

  Object.defineProperty(model, 'externalValue', {
    get: () => isControlled.value ? props[prop] : internal.value,
  });

  return model;
}
