// Components
import { VLabel } from '@/components/VLabel';

// Utilities
import { _FieldLabel } from './VFieldLabel.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VFieldLabelSlots } from './VFieldLabel.base';

export { makeVFieldLabelProps, VFieldLabelSlots } from './VFieldLabel.base';

export const VFieldLabel = genericVueComponent<VFieldLabelSlots>()({
  ..._FieldLabel,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <VLabel
        class={ rootClasses.value }
        style={ rootStyles.value }
        aria-hidden={ props.floating || undefined }
        v-slots={ slots }
      />
    );
  },
});

export type VFieldLabel = InstanceType<typeof VFieldLabel>;
