// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

// Types
export interface BorderProps {
  border?: boolean | number | string;
}

// Composables
export const makeBorderProps = propsFactory({
  border: [Boolean, Number, String],
}, 'border');

export function useBorder(
  vm: HeadlessInstance,
  props: BorderProps,
  name = getCurrentInstanceName(vm),
) {
  const { computed, isRef } = vm.reactivity;

  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes: ClassValue = {};

    if (border === true || border === '') {
      classes[`${name}--border`] = true;
    } else if (
      typeof border === 'string' ||
      border === 0
    ) {
      for (const value of String(border).split(' ')) {
        classes[`border-${value}`] = true;
      }
    }

    return classes;
  });

  return { borderClasses };
}
