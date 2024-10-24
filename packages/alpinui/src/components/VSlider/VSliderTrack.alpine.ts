// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SliderTrack } from './VSliderTrack.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSliderTrackProps as makeASliderTrackProps,
  VSliderTrackSlots as ASliderTrackSlots,
} from './VSliderTrack.base';

export const ASliderTrack = defineAlpineComponent({
  ..._SliderTrack,
  name: 'ASliderTrack',
});

export type ASliderTrack = AlpineInstanceFromOptions<typeof ASliderTrack>;
