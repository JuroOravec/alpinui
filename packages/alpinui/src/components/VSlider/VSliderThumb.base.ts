// Styles
import './VSliderThumb.sass';

// Components
import { VSliderSymbol } from './slider';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useElevation } from '@/composables/elevation';
import { useRtl } from '@/composables/locale';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, keyValues, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RippleValue } from '@/directives/ripple';

export type VSliderThumbSlots = {
  'thumb-label': { modelValue: number };
}

export const makeVSliderThumbProps = propsFactory({
  focused: Boolean,
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },
  name: String,

  ...makeComponentProps(),
}, 'VSliderThumb');

export const _SliderThumb = defineComponent({
  name: 'VSliderThumb',

  props: makeVSliderThumbProps(),

  emits: {
    'update:modelValue': (v: number) => true,
  },

  slots: makeSlots<VSliderThumbSlots>({
    'thumb-label': null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject } = vm.reactivity;

    const slider = inject(VSliderSymbol);
    const { classes, styles } = useComponent(vm, props);
    const { isRtl, rtlClasses } = useRtl(vm);
    if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider');

    const {
      thumbColor,
      step,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      isReversed,
      vertical,
      readonly,
      elevation,
      mousePressed,
      decimals,
      indexFromEnd,
    } = slider;

    const defaultThumbLabel = computed(() => props.modelValue.toFixed(step.value ? decimals.value : 1));

    const elevationProps = computed(() => !disabled.value ? elevation.value : undefined);
    const { elevationClasses } = useElevation(vm, elevationProps);
    const { textColorClasses, textColorStyles } = useTextColor(vm, thumbColor);

    const { pageup, pagedown, end, home, left, right, down, up } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];

    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3];
      else return [1, 5, 10];
    });

    function parseKeydown(e: KeyboardEvent, value: number) {
      if (!relevantKeys.includes(e.key)) return;

      e.preventDefault();

      const _step = step.value || 0.1;
      const steps = (props.max - props.min) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value
          ? [isRtl.value ? left : right, isReversed.value ? down : up]
          : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
        const direction = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : (e.ctrlKey ? 1 : 0);

        value = value + (direction * _step * multipliers.value[multiplier]);
      } else if (e.key === home) {
        value = props.min;
      } else if (e.key === end) {
        value = props.max;
      } else {
        const direction = e.key === pagedown ? 1 : -1;
        value = value - (direction * _step * (steps > 100 ? steps / 10 : 10));
      }

      return Math.max(props.min, Math.min(props.max, value));
    }

    function onKeydown(e: KeyboardEvent) {
      const newValue = parseKeydown(e, props.modelValue);

      newValue != null && vm.emit('update:modelValue', newValue);
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const positionPercentage = computed(() => convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, '%'));

    const rootClasses = computed(() => normalizeClass([
      'v-slider-thumb',
      {
        'v-slider-thumb--focused': props.focused,
        'v-slider-thumb--pressed': props.focused && mousePressed.value,
      },
      classes.value,
      rtlClasses.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      {
        '--v-slider-thumb-position': positionPercentage.value,
        '--v-slider-thumb-size': convertToUnit(thumbSize.value),
      },
      styles.value,
    ]));

    const thumbSurfaceClasses = computed(() => normalizeClass([
      'v-slider-thumb__surface',
      textColorClasses.value,
      elevationClasses.value,
    ]));

    const thumbRippleClasses = computed(() => normalizeClass([
      'v-slider-thumb__ripple',
      textColorClasses.value,
    ]));

    return {
      expose: {},
      renderInput: {
        direction,
        disabled,
        readonly,
        onKeydown,
        rootClasses,
        rootStyles,
        thumbSurfaceClasses,
        thumbRippleClasses,
        thumbLabel,
        defaultThumbLabel,
        textColorStyles,
      },
    };
  },
  renderHeadless: () => null,
});
