// Styles
import './VColorPickerSwatches.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import colors from '@/util/colors';
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { DeepReadonly, PropType } from 'vue';
import type { Color, HSV } from '@/util/colorUtils';

export const makeVColorPickerSwatchesProps = propsFactory({
  swatches: {
    type: Array as PropType<DeepReadonly<Color[][]>>,
    default: () => parseDefaultColors(colors),
  },
  disabled: Boolean,
  color: Object as PropType<HSV | null>,
  maxHeight: [Number, String],

  ...makeComponentProps(),
}, 'VColorPickerSwatches');

function parseDefaultColors(colors: Record<string, Record<string, string>>) {
  return Object.keys(colors).map((key) => {
    const color = colors[key];
    return color.base ? [
      color.base,
      color.darken4,
      color.darken3,
      color.darken2,
      color.darken1,
      color.lighten1,
      color.lighten2,
      color.lighten3,
      color.lighten4,
      color.lighten5,
    ] : [
      color.black,
      color.white,
      color.transparent,
    ];
  });
}

export interface VColorPickerSwatchesSlots {
  /** Empty */
}

export const _ColorPickerSwatches = defineComponent({
  name: 'VColorPickerSwatches',

  props: makeVColorPickerSwatchesProps(),

  emits: {
    'update:color': (color: HSV) => true,
  },

  slots: makeSlots<VColorPickerSwatchesSlots>(null),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-color-picker-swatches',
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      { maxHeight: convertToUnit(props.maxHeight) },
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
