// Composables
import { useDisplay } from '@/composables/display';

// Utilities
import { IN_BROWSER } from '@/util/globals';

// Types
import type { HeadlessInstance } from '@/engines/types';

export function useHydration(vm: HeadlessInstance) {
  const { onMounted, shallowRef } = vm.reactivity;

  if (!IN_BROWSER) return shallowRef(false);

  const { ssr } = useDisplay(vm);

  if (ssr) {
    const isMounted = shallowRef(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return isMounted;
  } else {
    return shallowRef(true);
  }
}
