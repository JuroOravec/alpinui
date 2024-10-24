// Styles
import './VTimeline.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { useRtl } from '@/composables/locale';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle, only } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { Prop } from 'vue';
import { makeVTimelineItemProps } from './VTimelineItem.base';
import type { RawSlots, Slots } from '@/engines/types';

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'start' | 'end' | undefined
export type TimelineAlign = 'center' | 'start'
export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

export const makeVTimelineProps = propsFactory({
  align: {
    type: String,
    default: 'center',
    validator: (v: any) => ['center', 'start'].includes(v),
  } as Prop<TimelineAlign>,
  direction: {
    type: String,
    default: 'vertical',
    validator: (v: any) => ['vertical', 'horizontal'].includes(v),
  } as Prop<TimelineDirection>,
  justify: {
    type: String,
    default: 'auto',
    validator: (v: any) => ['auto', 'center'].includes(v),
  },
  side: {
    type: String,
    validator: (v: any) => v == null || ['start', 'end'].includes(v),
  } as Prop<TimelineSide>,
  lineThickness: {
    type: [String, Number],
    default: 2,
  },
  lineColor: String,
  truncateLine: {
    type: String,
    validator: (v: any) => ['start', 'end', 'both'].includes(v),
  } as Prop<TimelineTruncateLine>,

  ...only(makeVTimelineItemProps({
    lineInset: 0,
  }), ['dotColor', 'fillDot', 'hideOpposite', 'iconColor', 'lineInset', 'size']),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VTimeline');

export interface VTimelineSlots extends RawSlots {
  default: never;
}

export const _Timeline = defineComponent({
  name: 'VTimeline',

  props: makeVTimelineProps(),

  slots: {} as Slots<VTimelineSlots>,

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { rtlClasses } = useRtl(vm);

    provideDefaults(vm, {
      VTimelineDivider: {
        lineColor: toRef(props, 'lineColor'),
      },
      VTimelineItem: {
        density: toRef(props, 'density'),
        dotColor: toRef(props, 'dotColor'),
        fillDot: toRef(props, 'fillDot'),
        hideOpposite: toRef(props, 'hideOpposite'),
        iconColor: toRef(props, 'iconColor'),
        lineColor: toRef(props, 'lineColor'),
        lineInset: toRef(props, 'lineInset'),
        size: toRef(props, 'size'),
      },
    });

    const sideClasses = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;

      return side && `v-timeline--side-${side}`;
    });

    const truncateClasses = computed(() => {
      const classes = [
        'v-timeline--truncate-line-start',
        'v-timeline--truncate-line-end',
      ];

      switch (props.truncateLine) {
        case 'both': return classes;
        case 'start': return classes[0];
        case 'end': return classes[1];
        default: return null;
      }
    });

    const rootClasses = computed(() => normalizeClass([
      'v-timeline',
      `v-timeline--${props.direction}`,
      `v-timeline--align-${props.align}`,
      `v-timeline--justify-${props.justify}`,
      truncateClasses.value,
      {
        'v-timeline--inset-line': !!props.lineInset,
      },
      themeClasses.value,
      densityClasses.value,
      sideClasses.value,
      rtlClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      {
        '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
      },
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