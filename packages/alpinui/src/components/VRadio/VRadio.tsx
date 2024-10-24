// Components
import { VSelectionControl } from '@/components/VSelectionControl/VSelectionControl';

// Utilities
import { _Radio } from './VRadio.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VRadioSlots } from './VRadio.base';

export { makeVRadioProps, VRadioSlots } from './VRadio.base';

export const VRadio = genericVueComponent<VRadioSlots>()({
  ..._Radio,
  renderHeadless: (
    vm,
    {
      controlProps,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <VSelectionControl
        { ...controlProps.value }
        class={ rootClasses.value }
        style={ props.style }
        type="radio"
        v-slots={ slots }
      />
    );
  },
});

export type VRadio = InstanceType<typeof VRadio>;
