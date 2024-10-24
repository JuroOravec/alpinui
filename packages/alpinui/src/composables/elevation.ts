// Utilities
import { propsFactory } from '@/util/propsFactory';

// Types
import type { Ref } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

export interface ElevationProps {
  elevation?: number | string | null;
}

// Composables
export const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v: any) {
      const value = parseInt(v);

      return (
        !isNaN(value) &&
        value >= 0 &&
        // Material Design has a maximum elevation of 24
        // https://material.io/design/environment/elevation.html#default-elevations
        value <= 24
      );
    },
  },
}, 'elevation');

type ElevationData = {
  elevationClasses: Ref<ClassValue>;
}

export function useElevation(
  vm: HeadlessInstance,
  props: ElevationProps | Ref<number | string | undefined>
): ElevationData {
  const { computed, isRef } = vm.reactivity;

  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes: ClassValue = {};

    if (elevation == null) return classes;

    classes[`elevation-${elevation}`] = true;

    return classes;
  });

  return { elevationClasses };
}
