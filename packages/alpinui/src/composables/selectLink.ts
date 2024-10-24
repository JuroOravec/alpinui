// Types
import type { UseRouterLink } from './router';
import type { HeadlessInstance } from '@/engines/types';

export function useSelectLink(
  vm: HeadlessInstance,
  link: UseRouterLink,
  select?: (value: boolean, e?: Event) => void,
) {
  const { nextTick, watch } = vm.reactivity;

  watch(() => link.isActive?.value, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true,
  });
}
