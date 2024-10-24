// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Timeline } from './VTimeline.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTimelineProps as makeATimelineProps,
  VTimelineSlots as ATimelineSlots,
  TimelineAlign,
  TimelineDirection,
  TimelineSide,
  TimelineTruncateLine,
} from './VTimeline.base';

export const ATimeline = defineAlpineComponent({
  ..._Timeline,
  name: 'ATimeline',
});

export type ATimeline = AlpineInstanceFromOptions<typeof ATimeline>;
