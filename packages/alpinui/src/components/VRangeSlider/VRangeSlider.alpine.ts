// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _RangeSlider } from './VRangeSlider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVRangeSliderProps as makeARangeSliderProps,
  VRangeSliderSlots as ARangeSliderSlots,
} from './VRangeSlider.base';

export const ARangeSlider = defineAlpineComponent({
  ..._RangeSlider,
  name: 'ARangeSlider',
});

export type ARangeSlider = AlpineInstanceFromOptions<typeof ARangeSlider>;
