// Types
import type { Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export function useRefs <T extends {}>(vm: HeadlessInstance) {
  const { onBeforeUpdate, ref } = vm.reactivity;
  const refs = ref<(T | undefined)[]>([]) as Ref<(T | undefined)[]>;

  onBeforeUpdate(() => (refs.value = []));

  function updateRef(e: any, i: number) {
    refs.value[i] = e;
  }

  return { refs, updateRef };
}
