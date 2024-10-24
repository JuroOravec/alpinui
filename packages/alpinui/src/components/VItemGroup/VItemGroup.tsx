// Utilities
import { _ItemGroup } from './VItemGroup.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VItemGroupSlots } from './VItemGroup.base';
import type { GenericProps } from '@/engines/vue';

export { makeVItemGroupProps, VItemGroupSlots, VItemGroupSymbol } from './VItemGroup.base';

export const VItemGroup = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VItemGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._ItemGroup,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyle,
      isSelected,
      select,
      next,
      prev,
      selected,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyle.value }
      >
        { slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value,
        })}
      </props.tag>
    );
  },
});

export type VItemGroup = InstanceType<typeof VItemGroup>;
