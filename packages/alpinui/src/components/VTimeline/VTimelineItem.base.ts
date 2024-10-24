// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps } from '@/composables/elevation';
import { makeRoundedProps } from '@/composables/rounded';
import { makeSizeProps } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VTimelineDivider } from './VTimelineDivider';
import { IconValue } from '../VIcon/icons.base';
import type { RawSlots } from '@/engines/types';

// Types
export type VTimelineItemSlots = RawSlots & {
  default: never;
  icon: never;
  opposite: never;
}

export const makeVTimelineItemProps = propsFactory({
  density: String as PropType<'default' | 'compact'>,
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  hideOpposite: {
    type: Boolean,
    default: undefined,
  },
  icon: IconValue,
  iconColor: String,
  lineInset: [Number, String],

  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
}, 'VTimelineItem');

export const _TimelineItem = defineComponent({
  name: 'VTimelineItem',

  props: makeVTimelineItemProps(),

  slots: makeSlots<VTimelineItemSlots>({
    default: null,
    icon: null,
    opposite: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, shallowRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { dimensionStyles } = useDimension(vm, props);

    const dotSize = shallowRef(0);
    const dotRef = ref<VTimelineDivider>();
    watch(dotRef, (newValue) => {
      if (!newValue) return;
      dotSize.value = newValue.$el.querySelector('.v-timeline-divider__dot')?.getBoundingClientRect().width ?? 0;
    }, {
      flush: 'post',
    });

    const rootClasses = computed(() => normalizeClass([
      'v-timeline-item',
      {
        'v-timeline-item--fill-dot': props.fillDot,
      },
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      {
        '--v-timeline-dot-size': convertToUnit(dotSize.value),
        '--v-timeline-line-inset': props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0),
      },
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        dotRef,
        dimensionStyles,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
