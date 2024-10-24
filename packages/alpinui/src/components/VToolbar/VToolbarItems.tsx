// Utilities
import { _ToolbarItems } from './VToolbarItems.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VToolbarItemsSlots } from './VToolbarItems.base';

export { makeVToolbarItemsProps, VToolbarItemsSlots } from './VToolbarItems.base';

export const VToolbarItems = genericVueComponent<VToolbarItemsSlots>()({
  ..._ToolbarItems,
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

export type VToolbarItems = InstanceType<typeof VToolbarItems>;
