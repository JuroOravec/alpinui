// Components
import { VSlideGroup } from '@/components/VSlideGroup/VSlideGroup';

// Utilities
import { _ChipGroup } from './VChipGroup.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VChipGroupSlots } from './VChipGroup.base';
import type { GenericProps } from '@/engines/vue';

export { makeVChipGroupProps, VChipGroupSlots, VChipGroupSymbol } from './VChipGroup.base';

export const VChipGroup = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VChipGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._ChipGroup,
  renderHeadless: (
    vm,
    {
      slideGroupProps,
      slideGroupClasses,
      slideGroupStyles,
      isSelected,
      select,
      next,
      prev,
      selected,
    },
    { slots },
  ) => {
    return (
      <VSlideGroup
        { ...slideGroupProps.value }
        class={ slideGroupClasses.value }
        style={ slideGroupStyles.value }
      >
        { slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value,
        })}
      </VSlideGroup>
    );
  },
});

export type VChipGroup = InstanceType<typeof VChipGroup>;
