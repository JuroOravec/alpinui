// Components
import { VExpandTransition } from '@/components/transitions';

// Utilities
import { _ExpansionPanelText } from './VExpansionPanelText.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VExpansionPanelTextSlots } from './VExpansionPanelText.base';

export { makeVExpansionPanelTextProps, VExpansionPanelTextSlots } from './VExpansionPanelText.base';

export const VExpansionPanelText = genericVueComponent<VExpansionPanelTextSlots>()({
  ..._ExpansionPanelText,
  renderHeadless: (
    vm,
    {
      expansionPanel,
      hasContent,
      rootClasses,
      rootStyles,
      onAfterLeave,
    },
    { slots },
  ) => {
    return (
      <VExpandTransition onAfterLeave={ onAfterLeave }>
        <div
          class={ rootClasses.value }
          style={ rootStyles.value }
          v-show={ expansionPanel.isSelected.value }
        >
          { slots.default && hasContent.value && (
            <div class="v-expansion-panel-text__wrapper">
              { slots.default?.() }
            </div>
          )}
        </div>
      </VExpandTransition>
    );
  },
});

export type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>;
