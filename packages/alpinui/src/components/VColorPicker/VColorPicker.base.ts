// Styles
import './VColorPicker.sass';

// Components
import { makeVSheetProps } from '@/components/VSheet/VSheet.base';

// Composables
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { useRtl } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { extractColor, modes, nullColor } from './util';
import { HSVtoCSS, parseColor, RGBtoHSV } from '@/util/colorUtils';
import { consoleWarn } from '@/util/console';
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { DeepReadonly, PropType } from 'vue';
import type { Color, HSV } from '@/util/colorUtils';

export const makeVColorPickerProps = propsFactory({
  canvasHeight: {
    type: [String, Number],
    default: 150,
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10,
  },
  hideCanvas: Boolean,
  hideSliders: Boolean,
  hideInputs: Boolean,
  mode: {
    type: String as PropType<keyof typeof modes>,
    default: 'rgba',
    validator: (v: string) => Object.keys(modes).includes(v),
  },
  modes: {
    type: Array as PropType<readonly (keyof typeof modes)[]>,
    default: () => Object.keys(modes),
    validator: (v: any) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m)),
  },
  showSwatches: Boolean,
  swatches: Array as PropType<DeepReadonly<Color[][]>>,
  swatchesMaxHeight: {
    type: [Number, String],
    default: 150,
  },
  modelValue: {
    type: [Object, String] as PropType<Record<string, unknown> | string | undefined | null>,
  },

  ...omit(makeVSheetProps({ width: 300 }), [
    'height',
    'location',
    'minHeight',
    'maxHeight',
    'minWidth',
    'maxWidth',
  ]),
}, 'VColorPicker');

export interface VColorPickerSlots {
  /** Empty */
}

export const _ColorPicker = defineComponent({
  name: 'VColorPicker',

  props: makeVColorPickerProps(),

  emits: {
    'update:modelValue': (color: any) => true,
    'update:mode': (mode: keyof typeof modes) => true,
  },

  slots: makeSlots<VColorPickerSlots>(null),

  setupHeadless(props, vm) {
    const { computed, onMounted, ref, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const mode = useProxiedModel(vm, props, 'mode');
    const hue = ref<number | null>(null);
    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      undefined,
      (v) => {
        if (v == null || v === '') return null;

        let c: HSV;
        try {
          c = RGBtoHSV(parseColor(v as any));
        } catch (err) {
          consoleWarn(err as any);
          return null;
        }

        return c;
      },
      (v) => {
        if (!v) return null;

        return extractColor(v, props.modelValue);
      }
    );
    const currentColor = computed(() => {
      return model.value
        ? { ...model.value, h: hue.value ?? model.value.h }
        : null;
    });
    const { rtlClasses } = useRtl(vm);

    let externalChange = true;
    watch(model, (v) => {
      if (!externalChange) {
        // prevent hue shift from rgb conversion inaccuracy
        externalChange = true;
        return;
      }
      if (!v) return;
      hue.value = v.h;
    }, { immediate: true });

    const updateColor = (hsva: HSV) => {
      externalChange = false;
      hue.value = hsva.h;
      model.value = hsva;
    };

    onMounted(() => {
      if (!props.modes.includes(mode.value)) mode.value = props.modes[0];
    });

    provideDefaults(vm, {
      VSlider: {
        color: undefined,
        trackColor: undefined,
        trackFillColor: undefined,
      },
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-color-picker',
      rtlClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      { '--v-color-picker-color-hsv': HSVtoCSS({ ...(currentColor.value ?? nullColor), a: 1 }) },
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        mode,
        currentColor,
        updateColor,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
