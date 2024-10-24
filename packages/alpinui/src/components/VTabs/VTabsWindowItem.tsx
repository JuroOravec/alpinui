// Components
import { VWindowItem } from '@/components/VWindow/VWindowItem';

// Utilities
import { _TabsWindowItem } from './VTabsWindowItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTabsWindowItemSlots } from './VTabsWindowItem.base';

export { makeVTabsWindowItemProps, VTabsWindowItemSlots } from './VTabsWindowItem.base';

export const VTabsWindowItem = genericVueComponent<VTabsWindowItemSlots>()({
  ..._TabsWindowItem,
  renderHeadless: (
    vm,
    { windowItemProps, rootClasses, rootStyles },
    { slots },
  ) => {
    return (
      <VWindowItem
        _as="VTabsWindowItem"
        { ...windowItemProps.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VTabsWindowItem = InstanceType<typeof VTabsWindowItem>;
