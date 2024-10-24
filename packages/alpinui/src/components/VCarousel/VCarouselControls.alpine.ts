// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CarouselControls } from './VCarouselControls.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCarouselControlsProps as makeACarouselControlsProps,
  VCarouselControlsSlots as ACarouselControlsSlots,
} from './VCarouselControls.base';

export const ACarouselControls = defineAlpineComponent({
  ..._CarouselControls,
  name: 'ACarouselControls',
});

export type ACarouselControls = AlpineInstanceFromOptions<typeof ACarouselControls>;
