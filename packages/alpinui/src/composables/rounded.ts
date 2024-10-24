// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { Ref } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

type RoundedValue = boolean | string | number | null | undefined

export interface RoundedProps {
  rounded?: RoundedValue;
  tile?: boolean;
}

type RoundedData = {
  roundedClasses: Ref<ClassValue>;
}

// Composables
export const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined,
  },
  tile: Boolean,
}, 'rounded');

export function useRounded(
  vm: HeadlessInstance,
  props: RoundedProps | Ref<RoundedValue>,
  name = getCurrentInstanceName(vm),
): RoundedData {
  const { computed, isRef } = vm.reactivity;

  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const tile = isRef(props) ? props.value : props.tile;
    const classes: ClassValue = {};

    if (rounded === true || rounded === '') {
      classes[`${name}--rounded`] = true;
    } else if (
      typeof rounded === 'string' ||
      rounded === 0
    ) {
      for (const value of String(rounded).split(' ')) {
        classes[`rounded-${value}`] = true;
      }
    } else if (tile || rounded === false) {
      classes['rounded-0'] = true;
    }

    return classes;
  });

  return { roundedClasses };
}
