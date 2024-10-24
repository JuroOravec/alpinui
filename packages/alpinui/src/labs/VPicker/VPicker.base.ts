// Styles
import './VPicker.sass';

// Components
import { _Sheet, makeVSheetProps } from '@/components/VSheet/VSheet.base';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
export type VPickerSlots = {
  header: never;
  default: never;
  actions: never;
  title: never;
}

export const makeVPickerProps = propsFactory({
  bgColor: String,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,

  ...makeVSheetProps(),
}, 'VPicker');

export const _Picker = defineComponent({
  name: 'VPicker',

  props: makeVPickerProps(),

  slots: makeSlots<VPickerSlots>({
    header: null,
    default: null,
    actions: null,
    title: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));

    const sheetProps = computed(() => _Sheet.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-picker',
      {
        'v-picker--landscape': props.landscape,
        'v-picker--with-actions': vm.hasSlots.actions,
      },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        backgroundColorClasses,
        backgroundColorStyles,
        sheetProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
