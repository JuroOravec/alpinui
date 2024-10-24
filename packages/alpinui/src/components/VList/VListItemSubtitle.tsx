// Utilities
import { _ListItemSubtitle } from './VListItemSubtitle.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListItemSubtitleSlots } from './VListItemSubtitle.base';

export { makeVListItemSubtitleProps, VListItemSubtitleSlots } from './VListItemSubtitle.base';

export const VListItemSubtitle = genericVueComponent<VListItemSubtitleSlots>()({
  ..._ListItemSubtitle,
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

export type VListItemSubtitle = InstanceType<typeof VListItemSubtitle>;
