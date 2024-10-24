// Components
import { VExpansionPanelSymbol } from './shared';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeLazyProps, useLazy } from '@/composables/lazy';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps(),
}, 'VExpansionPanelText');

export interface VExpansionPanelTextSlots extends RawSlots {
  default: never;
}

export const _ExpansionPanelText = defineComponent({
  name: 'VExpansionPanelText',

  props: makeVExpansionPanelTextProps(),

  slots: makeSlots<VExpansionPanelTextSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject } = vm.reactivity;

    const expansionPanel = inject(VExpansionPanelSymbol);

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');

    const { classes, styles } = useComponent(vm, props);
    const { hasContent, onAfterLeave } = useLazy(vm, props, expansionPanel.isSelected);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-expansion-panel-text',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        expansionPanel,
        hasContent,
        rootClasses,
        rootStyles: styles,
        onAfterLeave,
      },
    };
  },
  renderHeadless: () => null,
});
