// Styles
import './VTable.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export type VTableSlots = {
  default: never;
  top: never;
  bottom: never;
  wrapper: never;
}

export const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VTable');

export const _Table = defineComponent({
  name: 'VTable',

  props: makeVTableProps(),

  slots: makeSlots<VTableSlots>({
    default: null,
    top: null,
    bottom: null,
    wrapper: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { densityClasses } = useDensity(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-table',
      {
        'v-table--fixed-height': !!props.height,
        'v-table--fixed-header': props.fixedHeader,
        'v-table--fixed-footer': props.fixedFooter,
        'v-table--has-top': vm.hasSlots.top,
        'v-table--has-bottom': vm.hasSlots.bottom,
        'v-table--hover': props.hover,
      },
      themeClasses.value,
      densityClasses.value,
      classes.value,
    ]));

    const wrapperStyles = computed(() => normalizeStyle({
      height: convertToUnit(props.height)!,
    }));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
        wrapperStyles,
      },
    };
  },
  renderHeadless: () => null,
});
