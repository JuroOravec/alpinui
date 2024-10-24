// Utilities
import { _CardSubtitle } from './VCardSubtitle.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCardSubtitleSlots } from './VCardSubtitle.base';

export { makeVCardSubtitleProps, VCardSubtitleSlots } from './VCardSubtitle.base';

export const VCardSubtitle = genericVueComponent<VCardSubtitleSlots>()({
  ..._CardSubtitle,
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

export type VCardSubtitle = InstanceType<typeof VCardSubtitle>;
