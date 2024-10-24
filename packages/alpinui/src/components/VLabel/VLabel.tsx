// Utilities
import { _Label } from './VLabel.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VLabelSlots } from './VLabel.base';

export { makeVLabelProps, VLabelSlots } from './VLabel.base';

export const VLabel = genericVueComponent<VLabelSlots>()({
  ..._Label,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <label
        class={ rootClasses.value }
        style={ rootStyles.value }
        onClick={ props.onClick }
      >
        { props.text }

        { slots.default?.() }
      </label>
    );
  },
});

export type VLabel = InstanceType<typeof VLabel>;
