// Components
import { VBtnGroup } from '@/components/VBtnGroup/VBtnGroup';

// Utilities
import { _BtnToggle } from './VBtnToggle.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBtnToggleSlots } from './VBtnToggle.base';
import type { GenericProps } from '@/engines/vue';

export { makeVBtnToggleProps, VBtnToggleSlots, VBtnToggleSymbol } from './VBtnToggle.base';

export const VBtnToggle = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VBtnToggleSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._BtnToggle,
  renderHeadless: (
    vm,
    {
      btnGroupProps,
      rootClasses,
      rootStyles,
      isSelected,
      next,
      prev,
      select,
      selected,
    },
    { slots },
  ) => {
    return (
      <VBtnGroup
        class={ rootClasses.value }
        { ...btnGroupProps.value }
        style={ rootStyles.value }
      >
        { slots.default?.({
          isSelected,
          next,
          prev,
          select,
          selected,
        })}
      </VBtnGroup>
    );
  },
});

export type VBtnToggle = InstanceType<typeof VBtnToggle>;
