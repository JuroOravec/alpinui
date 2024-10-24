// Utilities
import { _ExpansionPanels } from './VExpansionPanels.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VExpansionPanelSlots } from './VExpansionPanels.base';

export { makeVExpansionPanelsProps, VExpansionPanelSlots } from './VExpansionPanels.base';

export const VExpansionPanels = genericVueComponent<VExpansionPanelSlots>()({
  ..._ExpansionPanels,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
      next,
      prev,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default?.({ prev, next }) }
      </props.tag>
    );
  },
});

export type VExpansionPanels = InstanceType<typeof VExpansionPanels>;
