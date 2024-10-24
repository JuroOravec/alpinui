// Utilities
import { propsFactory } from '@/util/propsFactory';

// Types
import type { Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export const makeLazyProps = propsFactory({
  eager: Boolean,
}, 'lazy');

export const useLazy = (vm: HeadlessInstance, props: { eager: boolean }, active: Ref<boolean>) => {
  const { computed, shallowRef, watch } = vm.reactivity;

  const isBooted = shallowRef(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);

  watch(active, () => isBooted.value = true);

  const onAfterLeave = () => {
    if (!props.eager) isBooted.value = false;
  };

  return { isBooted, hasContent, onAfterLeave };
};
