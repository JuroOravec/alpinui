// Utilities
import { _CardActions } from './VCardActions.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCardActionsSlots } from './VCardActions.base';

export { VCardActionsSlots, makeVCardActionsProps } from './VCardActions.base';

export const VCardActions = genericVueComponent<VCardActionsSlots>()({
  ..._CardActions,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default?.() }
      </div>
    );
  },
});

export type VCardActions = InstanceType<typeof VCardActions>;
