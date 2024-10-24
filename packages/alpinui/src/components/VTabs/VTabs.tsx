// Components
import { VTab } from './VTab';
import { VTabsWindow } from './VTabsWindow';
import { VTabsWindowItem } from './VTabsWindowItem';
import { VSlideGroup } from '@/components/VSlideGroup/VSlideGroup';

// Utilities
import { _Tabs } from './VTabs.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import { VTabsSymbol } from './shared';
import type { VTabsSlots } from './VTabs.base';

export { makeVTabsProps, VTabsSlots, VTabsSlot, TabItem } from './VTabs.base';

export const VTabs = genericVueComponent<VTabsSlots>()({
  ..._Tabs,
  renderHeadless: (
    vm,
    {
      items,
      model,
      slideGroupProps,
      rootClasses,
      rootStyles,
      scopeId,
    },
    { attrs, props, slots },
  ) => {
    const hasWindow = !!(slots.window || props.items.length > 0);

    return (
      <>
        <VSlideGroup
          { ...slideGroupProps.value }
          v-model={ model.value }
          class={ rootClasses.value }
          style={ rootStyles.value }
          role="tablist"
          symbol={ VTabsSymbol }
          { ...scopeId }
          { ...attrs }
        >
          { slots.default?.() ?? items.value.map((item) => (
            slots.tab?.({ item }) ?? (
              <VTab
                { ...item }
                key={ item.text }
                value={ item.value }
                v-slots={{
                  default: slots[`tab.${item.value}`] ? () => slots[`tab.${item.value}`]?.({ item }) : undefined,
                }}
              />
            )
          ))}
        </VSlideGroup>

        { hasWindow && (
          <VTabsWindow
            v-model={ model.value }
            key="tabs-window"
            { ...scopeId }
          >
            { items.value.map((item) => slots.item?.({ item }) ?? (
              <VTabsWindowItem
                value={ item.value }
                v-slots={{
                  default: () => slots[`item.${item.value}`]?.({ item }),
                }}
              />
            ))}

            { slots.window?.() }
          </VTabsWindow>
        )}
      </>
    );
  },
});

export type VTabs = InstanceType<typeof VTabs>;
