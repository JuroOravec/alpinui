// Utilities
import { _Item } from './VItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VItemSlots } from './VItem.base';

export { makeVItemProps, VItemSlots } from './VItem.base';

export const VItem = genericVueComponent<VItemSlots>()({
  ..._Item,
  renderHeadless: (
    vm,
    { isSelected, selectedClass, select, toggle, value, disabled },
    { slots },
  ) => {
    return slots.default?.({
      isSelected: isSelected.value,
      selectedClass: selectedClass.value,
      select,
      toggle,
      value: value.value,
      disabled: disabled.value,
    }) ?? null;
  },
});

export type VItem = InstanceType<typeof VItem>;
