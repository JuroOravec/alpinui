// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Rating } from './VRating.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVRatingProps as makeARatingProps,
  VRatingSlots as ARatingSlots,
} from './VRating.base';

export const ARating = defineAlpineComponent({
  ..._Rating,
  name: 'ARating',
});

export type ARating = AlpineInstanceFromOptions<typeof ARating>;
