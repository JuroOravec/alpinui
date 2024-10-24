// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _ExpansionPanelTitle } from './VExpansionPanelTitle.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VExpansionPanelTitleSlots } from './VExpansionPanelTitle.base';

export { makeVExpansionPanelTitleProps, VExpansionPanelTitleSlots, ExpansionPanelTitleSlot } from './VExpansionPanelTitle.base';

export const VExpansionPanelTitle = genericVueComponent<VExpansionPanelTitleSlots>()({
  ..._ExpansionPanelTitle,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      actionsDefaults,
      expansionPanel,
      rootClasses,
      rootStyles,
      slotProps,
    },
    { props, slots },
  ) => {
    return (
      <button
        class={ rootClasses.value }
        style={ rootStyles.value }
        type="button"
        tabindex={ expansionPanel.disabled.value ? -1 : undefined }
        disabled={ expansionPanel.disabled.value }
        aria-expanded={ expansionPanel.isSelected.value }
        onClick={ !props.readonly ? expansionPanel.toggle : undefined }
        v-ripple={ props.ripple }
      >
        <span class="v-expansion-panel-title__overlay" />

        { slots.default?.(slotProps.value) }

        { !props.hideActions && (
          <VDefaultsProvider
            defaults={ actionsDefaults.value }
          >
            <span class="v-expansion-panel-title__icon">
              { slots.actions?.(slotProps.value) ?? <VIcon /> }
            </span>
          </VDefaultsProvider>
        )}
      </button>
    );
  },
});

export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>;
