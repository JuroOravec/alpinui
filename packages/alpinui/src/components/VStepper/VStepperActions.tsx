// Components
import { VBtn } from '@/components/VBtn/VBtn';
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider';

// Utilities
import { _StepperActions } from './VStepperActions.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VStepperActionsSlots } from './VStepperActions.base';

export { makeVStepperActionsProps, VStepperActionsSlots } from './VStepperActions.base';

export const VStepperActions = genericVueComponent<VStepperActionsSlots>()({
  ..._StepperActions,
  renderHeadless: (
    vm,
    {
      nextDefaults,
      prevDefaults,
      onClickNext,
      onClickPrev,
    },
    { slots },
  ) => {
    const prevSlotProps = {
      onClick: onClickPrev,
    };
    const nextSlotProps = {
      onClick: onClickNext,
    };

    return (
      <div class="v-stepper-actions">
        <VDefaultsProvider
          defaults={ prevDefaults.value }
        >
          { slots.prev?.({ props: prevSlotProps }) ?? (
            <VBtn { ...prevSlotProps } />
          )}
        </VDefaultsProvider>

        <VDefaultsProvider
          defaults={ nextDefaults.value }
        >
          { slots.next?.({ props: nextSlotProps }) ?? (
            <VBtn { ...nextSlotProps } />
          )}
        </VDefaultsProvider>
      </div>
    );
  },
});

export type VStepperActions = InstanceType<typeof VStepperActions>;
