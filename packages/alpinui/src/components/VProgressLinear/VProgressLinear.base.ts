// Styles
import './VProgressLinear.sass';

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useIntersectionObserver } from '@/composables/intersectionObserver';
import { useRtl } from '@/composables/locale';
import { makeLocationProps, useLocation } from '@/composables/location';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { IN_BROWSER } from '@/util/globals';
import { clamp, convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export type VProgressLinearSlots = {
  default: { value: number, buffer: number };
}

export const makeVProgressLinearProps = propsFactory({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: true,
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0,
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4,
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100,
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,

  ...makeComponentProps(),
  ...makeLocationProps({ location: 'top' } as const),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VProgressLinear');

export const _ProgressLinear = defineComponent({
  name: 'VProgressLinear',

  props: makeVProgressLinearProps(),

  emits: {
    'update:modelValue': (value: number) => true,
  },

  slots: makeSlots<VProgressLinearSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const progress = useProxiedModel(vm, props, 'modelValue');
    const { isRtl, rtlClasses } = useRtl(vm);
    const { themeClasses } = provideTheme(vm, props);
    const { locationStyles } = useLocation(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, props, 'color');
    const {
      backgroundColorClasses,
      backgroundColorStyles,
    } = useBackgroundColor(vm, computed(() => props.bgColor || props.color));
    const {
      backgroundColorClasses: bufferColorClasses,
      backgroundColorStyles: bufferColorStyles,
    } = useBackgroundColor(vm, computed(() => props.bufferColor || props.bgColor || props.color));
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles,
    } = useBackgroundColor(vm, props, 'color');
    const { roundedClasses } = useRounded(vm, props);
    const { intersectionRef, isIntersecting } = useIntersectionObserver(vm);

    const max = computed(() => parseFloat(props.max));
    const height = computed(() => parseFloat(props.height));
    const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
    const normalizedValue = computed(() => clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition');
    const isForcedColorsModeActive = IN_BROWSER && window.matchMedia?.('(forced-colors: active)').matches;

    function handleClick(e: MouseEvent) {
      if (!intersectionRef.value) return;

      const { left, right, width } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? (width - e.clientX) + (right - width) : e.clientX - left;

      progress.value = Math.round(value / width * max.value);
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-progress-linear',
      {
        'v-progress-linear--absolute': props.absolute,
        'v-progress-linear--active': !!(props.active && isIntersecting.value),
        'v-progress-linear--reverse': isReversed.value,
        'v-progress-linear--rounded': !!props.rounded,
        'v-progress-linear--rounded-bar': props.roundedBar,
        'v-progress-linear--striped': props.striped,
      },
      roundedClasses.value,
      themeClasses.value,
      rtlClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      {
        bottom: props.location === 'bottom' ? 0 : undefined,
        top: props.location === 'top' ? 0 : undefined,
        height: props.active ? convertToUnit(height.value) : 0,
        '--v-progress-linear-height': convertToUnit(height.value),
        ...(props.absolute ? locationStyles.value : {}),
      },
      styles.value,
    ]));

    const streamClasses = computed(() => normalizeClass([
      'v-progress-linear__stream',
      textColorClasses.value,
    ]));

    const streamStyles = computed(() => normalizeStyle({
      ...textColorStyles.value,
      [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value),
      borderTop: `${convertToUnit(height.value / 2)} dotted`,
      opacity: parseFloat(props.bufferOpacity!),
      top: `calc(50% - ${convertToUnit(height.value / 4)})`,
      width: convertToUnit(100 - normalizedBuffer.value, '%'),
      '--v-progress-linear-stream-to': convertToUnit(height.value * (isReversed.value ? 1 : -1)),
    }));

    const bgClasses = computed(() => normalizeClass([
      'v-progress-linear__background',
      !isForcedColorsModeActive ? backgroundColorClasses.value : undefined,
    ]));

    const bgStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      {
        opacity: parseFloat(props.bgOpacity!),
        width: props.stream ? 0 : undefined,
      },
    ]));

    const bufferClasses = computed(() => normalizeClass([
      'v-progress-linear__buffer',
      !isForcedColorsModeActive ? bufferColorClasses.value : undefined,
    ]));

    const bufferStyles = computed(() => normalizeStyle([
      bufferColorStyles.value,
      {
        opacity: parseFloat(props.bufferOpacity!),
        width: convertToUnit(normalizedBuffer.value, '%'),
      },
    ]));

    const determinateClasses = computed(() => normalizeClass([
      'v-progress-linear__determinate',
      !isForcedColorsModeActive ? barColorClasses.value : undefined,
    ]));

    const determinateStyles = computed(() => normalizeStyle([
      barColorStyles.value,
      { width: convertToUnit(normalizedValue.value, '%') },
    ]));

    const indeterminateClasses = computed(() => normalizeClass([
      'v-progress-linear__indeterminate',
      !isForcedColorsModeActive ? barColorClasses.value : undefined,
    ]));

    return {
      expose: {},
      renderInput: {
        barColorStyles,
        intersectionRef,
        normalizedBuffer,
        normalizedValue,
        handleClick,
        transition,
        rootClasses,
        rootStyles,
        streamClasses,
        streamStyles,
        bgClasses,
        bgStyles,
        bufferClasses,
        bufferStyles,
        determinateClasses,
        determinateStyles,
        indeterminateClasses,
      },
    };
  },
  renderHeadless: () => null,
});
