// Utilities
import { _LayoutItem } from './VLayoutItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VLayoutItemSlots } from './VLayoutItem.base';

export { makeVLayoutItemProps, VLayoutItemSlots } from './VLayoutItem.base';

export const VLayoutItem = genericVueComponent<VLayoutItemSlots>()({
  ..._LayoutItem,
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

export type VLayoutItem = InstanceType<typeof VLayoutItem>;
