// Types
import type { CSSProperties } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export const useSsrBoot = (vm: HeadlessInstance) => {
  const { computed, readonly, shallowRef, onMounted } = vm.reactivity;

  const isBooted = shallowRef(false);

  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true;
    });
  });

  const ssrBootStyles = computed((): CSSProperties => !isBooted.value ? ({
    transition: 'none !important',
  }) : {});

  return { ssrBootStyles, isBooted: readonly(isBooted) };
};
