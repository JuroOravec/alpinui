// Utilities
import { _CardText } from './VCardText.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCardTextSlots } from './VCardText.base';

export { makeVCardTextProps, VCardTextSlots } from './VCardText.base';

export const VCardText = genericVueComponent<VCardTextSlots>()({
  ..._CardText,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VCardText = InstanceType<typeof VCardText>;
