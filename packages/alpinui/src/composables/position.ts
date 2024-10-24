// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'] as const;

type Position = typeof positionValues[number]

export interface PositionProps {
  position?: Position | undefined;
}

// Composables
export const makePositionProps = propsFactory({
  position: {
    type: String as PropType<Position>,
    validator: /* istanbul ignore next */ (v: any) => positionValues.includes(v),
  },
}, 'position');

export function usePosition(
  vm: HeadlessInstance,
  props: PositionProps,
  name = getCurrentInstanceName(vm),
) {
  const { computed } = vm.reactivity;

  const positionClasses = computed((): ClassValue => ({
    [`${name}--${props.position}`]: !!props.position,
  }));

  return { positionClasses };
}
