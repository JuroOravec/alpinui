// Styles
import './VSliderTrack.sass';

// Components
import { VSliderSymbol } from './slider';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useRounded } from '@/composables/rounded';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Tick } from './slider';

export type VSliderTrackSlots = {
  'tick-label': { tick: Tick, index: number };
}

export const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true,
  },
  stop: {
    type: Number,
    required: true,
  },

  ...makeComponentProps(),
}, 'VSliderTrack');

export const _SliderTrack = defineComponent({
  name: 'VSliderTrack',

  props: makeVSliderTrackProps(),

  emits: {},

  slots: makeSlots<VSliderTrackSlots>({
    'tick-label': null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject } = vm.reactivity;

    const slider = inject(VSliderSymbol);

    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider');

    const {
      color,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
      indexFromEnd,
    } = slider;

    const { classes, styles } = useComponent(vm, props);
    const { roundedClasses } = useRounded(vm, rounded);

    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles,
    } = useBackgroundColor(vm, trackFillColor);

    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles,
    } = useBackgroundColor(vm, trackColor);

    const startDir = computed(() => `inset-${vertical.value ? 'block' : 'inline'}-${indexFromEnd.value ? 'end' : 'start'}`);
    const endDir = computed(() => vertical.value ? 'height' : 'width');

    const backgroundStyles = computed(() => normalizeStyle([
      {
        [startDir.value]: '0%',
        [endDir.value]: '100%',
      },
      trackColorStyles.value,
    ]));

    const trackFillWidth = computed(() => props.stop - props.start);

    const trackFillStyles = computed(() => normalizeStyle([
      {
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%'),
      },
      trackFillColorStyles.value,
    ]));

    const ticks = computed(() => {
      if (!showTicks.value) return [];

      return vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
    });

    const getTickDirection = (tick: Tick) => {
      return tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, '%') : undefined;
    };

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-slider-track',
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      {
        '--v-slider-track-size': convertToUnit(trackSize.value),
        '--v-slider-tick-size': convertToUnit(tickSize.value),
      },
      styles.value,
    ]));

    const backgroundClasses = computed(() => normalizeClass([
      'v-slider-track__background',
      trackColorClasses.value,
      {
        'v-slider-track__background--opacity': !!color.value || !trackFillColor.value,
      },
    ]));

    const trackFillClasses = computed(() => normalizeClass([
      'v-slider-track__fill',
      trackFillColorClasses.value,
    ]));

    return {
      expose: {},
      renderInput: {
        min,
        max,
        startDir,
        ticks,
        showTicks,
        getTickDirection,
        backgroundClasses,
        backgroundStyles,
        rootClasses,
        rootStyles,
        trackFillClasses,
        trackFillStyles,
      },
    };
  },
  renderHeadless: () => null,
});
