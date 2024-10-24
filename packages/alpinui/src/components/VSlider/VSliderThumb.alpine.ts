// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SliderThumb } from './VSliderThumb.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSliderThumbProps as makeASliderThumbProps,
  VSliderThumbSlots as ASliderThumbSlots,
} from './VSliderThumb.base';

export const ASliderThumb = defineAlpineComponent({
  ..._SliderThumb,
  name: 'ASliderThumb',
});

export type ASliderThumb = AlpineInstanceFromOptions<typeof ASliderThumb>;
