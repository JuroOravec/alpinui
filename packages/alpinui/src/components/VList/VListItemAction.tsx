// Utilities
import { _ListItemAction } from './VListItemAction.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListItemActionSlots } from './VListItemAction.base';

export { makeVListItemActionProps, VListItemActionSlots } from './VListItemAction.base';

export const VListItemAction = genericVueComponent<VListItemActionSlots>()({
  ..._ListItemAction,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ props.style }
        v-slots={ slots }
      />
    );
  },
});

export type VListItemAction = InstanceType<typeof VListItemAction>;
