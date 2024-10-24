// Components
import { VWindow } from '@/components/VWindow/VWindow';

// Utilities
import { _StepperWindow } from './VStepperWindow.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VStepperWindowSlots } from './VStepperWindow.base';

export { makeVStepperWindowProps, VStepperWindowSlots } from './VStepperWindow.base';

export const VStepperWindow = genericVueComponent<VStepperWindowSlots>()({
  ..._StepperWindow,
  renderHeadless: (
    vm,
    {
      model,
      rootClasses,
      rootStyles,
      windowProps,
    },
    { slots },
  ) => {
    return (
      <VWindow
        _as="VStepperWindow"
        { ...windowProps.value }
        v-model={ model.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        mandatory={ false }
        touch={ false }
        v-slots={ slots }
      />
    );
  },
});

export type VStepperWindow = InstanceType<typeof VStepperWindow>;
