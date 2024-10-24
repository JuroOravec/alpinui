// Composables
import { useColor } from '@/composables/color';

// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';
import type { MaybeRef } from '@/util/helpers';

export const allowedVariants = [
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text',
  'plain',
] as const;

export type Variant = typeof allowedVariants[number]

export interface VariantProps {
  color?: string;
  variant: Variant;
}

export const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String as PropType<Variant>,
    default: 'elevated',
    validator: (v: any) => allowedVariants.includes(v),
  },
}, 'variant');

export function useVariant(
  vm: HeadlessInstance,
  props: MaybeRef<VariantProps>,
  name = getCurrentInstanceName(vm),
) {
  const { computed, unref } = vm.reactivity;

  const variantClasses = computed((): ClassValue => {
    const { variant } = unref(props);
    return {
      [`${name}--variant-${variant}`]: true,
    };
  });

  const { colorClasses, colorStyles } = useColor(vm, computed(() => {
    const { variant, color } = unref(props);
    return {
      [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color,
    };
  }));

  return { colorClasses, colorStyles, variantClasses };
}
