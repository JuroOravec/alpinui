// Utilities
import { _SelectionControlGroup } from './VSelectionControlGroup.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSelectionControlGroupSlots } from './VSelectionControlGroup.base';
import type { GenericProps } from '@/engines/vue';

export {
  makeVSelectionControlGroupProps,
  makeSelectionControlGroupProps,
  VSelectionControlGroupSlots,
  VSelectionControlGroupSymbol,
  VSelectionGroupContext,
} from './VSelectionControlGroup.base';

export const VSelectionControlGroup = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VSelectionControlGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._SelectionControlGroup,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
        role={ props.type === 'radio' ? 'radiogroup' : undefined }
      >
        { slots.default?.() }
      </div>
    );
  },
});

export type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>;
