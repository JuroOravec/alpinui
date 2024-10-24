// Components
import { VWindowItem } from '@/components/VWindow/VWindowItem';

// Utilities
import { _StepperWindowItem } from './VStepperWindowItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VStepperWindowItemSlots } from './VStepperWindowItem.base';

export { makeVStepperWindowItemProps, VStepperWindowItemSlots } from './VStepperWindowItem.base';

export const VStepperWindowItem = genericVueComponent<VStepperWindowItemSlots>()({
  ..._StepperWindowItem,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles, windowItemProps },
    { slots },
  ) => {
    return (
      <VWindowItem
        _as="VStepperWindowItem"
        { ...windowItemProps.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VStepperWindowItem = InstanceType<typeof VStepperWindowItem>;
