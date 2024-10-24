// Components
import { VSelectionControl } from '@/components/VSelectionControl/VSelectionControl';

// Utilities
import { _CheckboxBtn } from './VCheckboxBtn.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCheckboxBtnSlots } from './VCheckboxBtn.base';
import type { GenericProps } from '@/engines/vue';

export { makeVCheckboxBtnProps, VCheckboxBtnSlots } from './VCheckboxBtn.base';

export const VCheckboxBtn = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VCheckboxBtnSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._CheckboxBtn,
  renderHeadless: (
    vm,
    {
      controlProps,
      model,
      onChange,
      falseIcon,
      trueIcon,
      rootAriaChecked,
      rootClasses,
      rootStyles,
    },
    { slots },
  ) => {
    return (
      <VSelectionControl
        { ...controlProps.value }
        v-model={ model.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        type="checkbox"
        onUpdate:modelValue={ onChange }
        falseIcon={ falseIcon.value }
        trueIcon={ trueIcon.value }
        aria-checked={ rootAriaChecked.value }
        v-slots={ slots }
      />
    );
  },
});

export type VCheckboxBtn = InstanceType<typeof VCheckboxBtn>;
