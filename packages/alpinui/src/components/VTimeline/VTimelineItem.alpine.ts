// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _TimelineItem } from './VTimelineItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTimelineItemProps as makeATimelineItemProps,
  VTimelineItemSlots as ATimelineItemSlots,
} from './VTimelineItem.base';

export const ATimelineItem = defineAlpineComponent({
  ..._TimelineItem,
  name: 'ATimelineItem',
});

export type ATimelineItem = AlpineInstanceFromOptions<typeof ATimelineItem>;
