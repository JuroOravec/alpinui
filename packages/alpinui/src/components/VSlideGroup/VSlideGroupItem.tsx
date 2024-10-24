// Utilities
import { _SlideGroupItem } from './VSlideGroupItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSlideGroupItemSlots } from './VSlideGroupItem.base';

export { makeVSlideGroupItemProps, VSlideGroupItemSlots } from './VSlideGroupItem.base';

export const VSlideGroupItem = genericVueComponent<VSlideGroupItemSlots>()({
  ..._SlideGroupItem,
  renderHeadless: (
    vm,
    { slideGroupItem },
    { slots },
  ) => {
    return slots.default?.({
      isSelected: slideGroupItem.isSelected.value,
      select: slideGroupItem.select,
      toggle: slideGroupItem.toggle,
      selectedClass: slideGroupItem.selectedClass.value,
    }) ?? null;
  },
});

export type VSlideGroupItem = InstanceType<typeof VSlideGroupItem>;
