// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SlideGroupItem } from './VSlideGroupItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSlideGroupItemProps as makeASlideGroupItemProps,
  VSlideGroupItemSlots as ASlideGroupItemSlots,
} from './VSlideGroupItem.base';

export const ASlideGroupItem = defineAlpineComponent({
  ..._SlideGroupItem,
  name: 'ASlideGroupItem',
});

export type ASlideGroupItem = AlpineInstanceFromOptions<typeof ASlideGroupItem>;
