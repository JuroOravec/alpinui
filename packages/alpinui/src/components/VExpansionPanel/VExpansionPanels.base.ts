// Styles
import './VExpansionPanel.sass';

// Components
import { VExpansionPanelSymbol } from './shared';
import { makeVExpansionPanelProps } from './VExpansionPanel.base';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeGroupProps, useGroup } from '@/composables/group';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, pick } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

const allowedVariants = ['default', 'accordion', 'inset', 'popout'] as const;

type Variant = typeof allowedVariants[number]

export type VExpansionPanelSlot = {
  prev: () => void;
  next: () => void;
}

export type VExpansionPanelSlots = {
  default: VExpansionPanelSlot;
}

export const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,

  ...makeGroupProps(),
  ...pick(makeVExpansionPanelProps(), [
    'bgColor',
    'collapseIcon',
    'color',
    'eager',
    'elevation',
    'expandIcon',
    'focusable',
    'hideActions',
    'readonly',
    'ripple',
    'rounded',
    'tile',
    'static',
  ]),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),

  variant: {
    type: String as PropType<Variant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
}, 'VExpansionPanels');

export const _ExpansionPanels = defineComponent({
  name: 'VExpansionPanels',

  props: makeVExpansionPanelsProps(),

  emits: {
    'update:modelValue': (val: unknown) => true,
  },

  slots: makeSlots<VExpansionPanelSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { next, prev } = useGroup(vm, props, VExpansionPanelSymbol);

    const { themeClasses } = provideTheme(vm, props);

    const variantClass = computed(() => normalizeClass(
      props.variant && `v-expansion-panels--variant-${props.variant}`
    ));

    provideDefaults(vm, {
      VExpansionPanel: {
        bgColor: toRef(props, 'bgColor'),
        collapseIcon: toRef(props, 'collapseIcon'),
        color: toRef(props, 'color'),
        eager: toRef(props, 'eager'),
        elevation: toRef(props, 'elevation'),
        expandIcon: toRef(props, 'expandIcon'),
        focusable: toRef(props, 'focusable'),
        hideActions: toRef(props, 'hideActions'),
        readonly: toRef(props, 'readonly'),
        ripple: toRef(props, 'ripple'),
        rounded: toRef(props, 'rounded'),
        static: toRef(props, 'static'),
      },
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-expansion-panels',
      {
        'v-expansion-panels--flat': props.flat,
        'v-expansion-panels--tile': props.tile,
      },
      themeClasses.value,
      variantClass.value,
      classes.value,
    ]));

    return {
      expose: {
        next,
        prev,
      },
      renderInput: {
        rootClasses,
        rootStyles: styles,
        next,
        prev,
      },
    };
  },
  renderHeadless: () => null,
});
