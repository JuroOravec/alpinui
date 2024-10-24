// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

const allowedDensities = [null, 'default', 'comfortable', 'compact'] as const;

// typeof allowedDensities[number] evalutes to any
// when generating api types for whatever reason.
export type Density = null | 'default' | 'comfortable' | 'compact'

export interface DensityProps {
  density?: Density;
}

// Composables
export const makeDensityProps = propsFactory({
  density: {
    type: String as PropType<Density>,
    default: 'default' as Density,
    validator: (v: any) => allowedDensities.includes(v),
  },
}, 'density');

export function useDensity(
  vm: HeadlessInstance,
  props: DensityProps,
  name = getCurrentInstanceName(vm),
) {
  const { computed } = vm.reactivity;

  const densityClasses = computed((): ClassValue => ({
    [`${name}--density-${props.density}`]: true,
  }));

  return { densityClasses };
}
