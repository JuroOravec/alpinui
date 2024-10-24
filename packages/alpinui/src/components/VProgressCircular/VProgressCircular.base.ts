// Styles
import './VProgressCircular.sass';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useIntersectionObserver } from '@/composables/intersectionObserver';
import { useResizeObserver } from '@/composables/resizeObserver';
import { makeSizeProps, useSize } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String] as PropType<boolean | 'disable-shrink'>,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  rotate: {
    type: [Number, String],
    default: 0,
  },
  width: {
    type: [Number, String],
    default: 4,
  },

  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'div' }),
  ...makeThemeProps(),
}, 'VProgressCircular');

export type VProgressCircularSlots = {
  default: { value: number };
}

export const _ProgressCircular = defineComponent({
  name: 'VProgressCircular',

  props: makeVProgressCircularProps(),

  slots: makeSlots<VProgressCircularSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;

    const { computed, ref, toRef, watchEffect } = vm.reactivity;

    const root = ref<HTMLElement>();

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { sizeClasses, sizeStyles } = useSize(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, toRef(props, 'color'));
    const { textColorClasses: underlayColorClasses, textColorStyles: underlayColorStyles } = useTextColor(vm, toRef(props, 'bgColor'));
    const { intersectionRef, isIntersecting } = useIntersectionObserver(vm);
    const { resizeRef, contentRect } = useResizeObserver(vm);

    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value
        ? Number(props.size)
        : contentRect.value
          ? contentRect.value.width
          : Math.max(width.value, 32);
    });
    const diameter = computed(() => (MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value)) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit(((100 - normalizedValue.value) / 100) * CIRCUMFERENCE));

    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-progress-circular',
      {
        'v-progress-circular--indeterminate': !!props.indeterminate,
        'v-progress-circular--visible': isIntersecting.value,
        'v-progress-circular--disable-shrink': props.indeterminate === 'disable-shrink',
      },
      themeClasses.value,
      sizeClasses.value,
      textColorClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      sizeStyles.value,
      textColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        diameter,
        normalizedValue,
        root,
        rootClasses,
        rootStyles,
        strokeDashOffset,
        strokeWidth,
        underlayColorClasses,
        underlayColorStyles,
        MAGIC_RADIUS_CONSTANT,
        CIRCUMFERENCE,
      },
    };
  },
  renderHeadless: () => null,
});
