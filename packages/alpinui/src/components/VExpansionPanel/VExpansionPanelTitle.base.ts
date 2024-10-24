// Components
import { VExpansionPanelSymbol } from './shared';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { RippleValue } from '@/directives/ripple';

export interface ExpansionPanelTitleSlot {
  collapseIcon: IconValue;
  disabled: boolean | undefined;
  expanded: boolean;
  expandIcon: IconValue;
  readonly: boolean;
}

export type VExpansionPanelTitleSlots = {
  default: ExpansionPanelTitleSlot;
  actions: ExpansionPanelTitleSlot;
}

export const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: '$expand',
  },
  collapseIcon: {
    type: IconValue,
    default: '$collapse',
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: false,
  },
  readonly: Boolean,

  ...makeComponentProps(),
}, 'VExpansionPanelTitle');

export const _ExpansionPanelTitle = defineComponent({
  name: 'VExpansionPanelTitle',

  props: makeVExpansionPanelTitleProps(),

  slots: makeSlots<VExpansionPanelTitleSlots>({
    default: null,
    actions: null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject } = vm.reactivity;

    const expansionPanel = inject(VExpansionPanelSymbol);

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, props, 'color');

    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly,
    }));

    const icon = computed(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-expansion-panel-title',
      {
        'v-expansion-panel-title--active': expansionPanel.isSelected.value,
        'v-expansion-panel-title--focusable': props.focusable,
        'v-expansion-panel-title--static': props.static,
      },
      backgroundColorClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      styles.value,
    ]));

    const actionsDefaults = computed(() => ({
      VIcon: {
        icon: icon.value,
      },
    }));

    return {
      expose: {},
      renderInput: {
        actionsDefaults,
        expansionPanel,
        rootClasses,
        rootStyles,
        slotProps,
      },
    };
  },
  renderHeadless: () => null,
});
