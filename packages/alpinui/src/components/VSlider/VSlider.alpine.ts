// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Slider } from './VSlider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSliderProps as makeASliderProps,
  VSliderSlots as ASliderSlots,
} from './VSlider.base';

export const ASlider = defineAlpineComponent({
  ..._Slider,
  name: 'ASlider',
});

export type ASlider = AlpineInstanceFromOptions<typeof ASlider>;
