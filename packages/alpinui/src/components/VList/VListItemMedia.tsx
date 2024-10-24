// Utilities
import { _ListItemMedia } from './VListItemMedia.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListItemMediaSlots } from './VListItemMedia.base';

export { makeVListItemMediaProps, VListItemMediaSlots } from './VListItemMedia.base';

export const VListItemMedia = genericVueComponent<VListItemMediaSlots>()({
  ..._ListItemMedia,
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

export type VListItemMedia = InstanceType<typeof VListItemMedia>;
