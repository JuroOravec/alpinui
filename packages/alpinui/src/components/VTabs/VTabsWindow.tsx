// Components
import { VWindow } from '@/components/VWindow/VWindow';

// Utilities
import { _TabsWindow } from './VTabsWindow.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTabsWindowSlots } from './VTabsWindow.base';

export { makeVTabsWindowProps, VTabsWindowSlots } from './VTabsWindow.base';

export const VTabsWindow = genericVueComponent<VTabsWindowSlots>()({
  ..._TabsWindow,
  renderHeadless: (
    vm,
    { model, rootClasses, rootStyles, windowProps },
    { slots },
  ) => {
    return (
      <VWindow
        _as="VTabsWindow"
        { ...windowProps.value }
        v-model={ model.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        mandatory={ false }
        touch={ false }
        v-slots={ slots }
      />
    );
  },
});

export type VTabsWindow = InstanceType<typeof VTabsWindow>;
