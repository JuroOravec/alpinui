// Components
import { IconValue } from '@/components/VIcon/icons.base';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeSizeProps, useSize } from '@/composables/size';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVTimelineDividerProps = propsFactory({
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  icon: IconValue,
  iconColor: String,
  lineColor: String,

  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeElevationProps(),
}, 'VTimelineDivider');

export interface VTimelineDividerSlots extends RawSlots {
  default: never;
}

export const _TimelineDivider = defineComponent({
  name: 'VTimelineDivider',

  props: makeVTimelineDividerProps(),

  slots: makeSlots<VTimelineDividerSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { sizeClasses, sizeStyles } = useSize(vm, props, 'v-timeline-divider__dot');
    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(vm, toRef(props, 'dotColor'));
    const { roundedClasses } = useRounded(vm, props, 'v-timeline-divider__dot');
    const { elevationClasses } = useElevation(vm, props);
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles,
    } = useBackgroundColor(vm, toRef(props, 'lineColor'));

    const rootClasses = computed(() => normalizeClass([
      'v-timeline-divider',
      {
        'v-timeline-divider--fill-dot': props.fillDot,
      },
      classes.value,
    ]));

    const beforeClasses = computed(() => normalizeClass([
      'v-timeline-divider__before',
      lineColorClasses.value,
    ]));

    const afterClasses = computed(() => normalizeClass([
      'v-timeline-divider__after',
      lineColorClasses.value,
    ]));

    const dotClasses = computed(() => normalizeClass([
      'v-timeline-divider__dot',
      elevationClasses.value,
      roundedClasses.value,
      sizeClasses.value,
    ]));

    const dotInnerClasses = computed(() => normalizeClass([
      'v-timeline-divider__inner-dot',
      backgroundColorClasses.value,
      roundedClasses.value,
    ]));

    const defaults = computed(() => ({
      VIcon: {
        color: props.iconColor,
        icon: props.icon,
        size: props.size,
      },
    }));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
        beforeClasses,
        afterClasses,
        lineColorStyles,
        dotClasses,
        sizeStyles,
        dotInnerClasses,
        backgroundColorStyles,
        defaults,
      },
    };
  },
  renderHeadless: () => null,
});
