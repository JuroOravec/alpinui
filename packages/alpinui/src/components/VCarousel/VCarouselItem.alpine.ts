// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CarouselItem } from './VCarouselItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCarouselItemProps as makeACarouselItemProps,
  VCarouselItemSlots as ACarouselItemSlots,
} from './VCarouselItem.base';

export const ACarouselItem = defineAlpineComponent({
  ..._CarouselItem,
  name: 'ACarouselItem',
});

export type ACarouselItem = AlpineInstanceFromOptions<typeof ACarouselItem>;
