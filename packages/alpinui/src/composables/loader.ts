// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

export interface LoaderProps {
  loading?: boolean | string;
}

// Composables
export const makeLoaderProps = propsFactory({
  loading: [Boolean, String],
}, 'loader');

export function useLoader(
  vm: HeadlessInstance,
  props: LoaderProps,
  name = getCurrentInstanceName(vm),
) {
  const { computed } = vm.reactivity;

  const loaderClasses = computed((): ClassValue => ({
    [`${name}--loading`]: !!props.loading,
  }));

  return { loaderClasses };
}
