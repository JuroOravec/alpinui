// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _TimelineDivider } from './VTimelineDivider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTimelineDividerProps as makeATimelineDividerProps,
  VTimelineDividerSlots as ATimelineDividerSlots,
} from './VTimelineDivider.base';

export const ATimelineDivider = defineAlpineComponent({
  ..._TimelineDivider,
  name: 'ATimelineDivider',
});

export type ATimelineDivider = AlpineInstanceFromOptions<typeof ATimelineDivider>;
