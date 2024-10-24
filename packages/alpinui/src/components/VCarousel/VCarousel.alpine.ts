// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Carousel } from './VCarousel.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCarouselProps as makeACarouselProps,
  VCarouselSlots as ACarouselSlots,
} from './VCarousel.base';

export const ACarousel = defineAlpineComponent({
  ..._Carousel,
  name: 'ACarousel',
});

export type ACarousel = AlpineInstanceFromOptions<typeof ACarousel>;
