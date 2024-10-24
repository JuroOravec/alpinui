// Components
import { VExpansionPanelText } from './VExpansionPanelText';
import { VExpansionPanelTitle } from './VExpansionPanelTitle';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';

// Utilities
import { _ExpansionPanel } from './VExpansionPanel.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VExpansionPanelSlots } from './VExpansionPanel.base';

export { makeVExpansionPanelProps, VExpansionPanelSlots } from './VExpansionPanel.base';

export const VExpansionPanel = genericVueComponent<VExpansionPanelSlots>()({
  ..._ExpansionPanel,
  renderHeadless: (
    vm,
    {
      defaults,
      shadowClasses,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    // TODO(Alpunui): Handle this as Django and AlpineJS checks
    const hasText = !!(slots.text || props.text);
    const hasTitle = !!(slots.title || props.title);

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <div
          class={ shadowClasses.value }
        />

        <VDefaultsProvider
          defaults={ defaults.value }
        >
          { hasTitle && (
            <VExpansionPanelTitle key="title">
              { slots.title ? slots.title() : props.title }
            </VExpansionPanelTitle>
          )}

          { hasText && (
            <VExpansionPanelText key="text">
              { slots.text ? slots.text() : props.text }
            </VExpansionPanelText>
          )}

          { slots.default?.() }
        </VDefaultsProvider>
      </props.tag>
    );
  },
});

export type VExpansionPanel = InstanceType<typeof VExpansionPanel>;
