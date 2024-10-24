// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SlideGroup } from './VSlideGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSlideGroupProps as makeASlideGroupProps,
  VSlideGroupSlots as ASlideGroupSlots,
  SlideGroupSlot,
  VSlideGroupSymbol as ASlideGroupSymbol,
} from './VSlideGroup.base';

export const ASlideGroup = defineAlpineComponent({
  ..._SlideGroup,
  name: 'ASlideGroup',
});

export type ASlideGroup = AlpineInstanceFromOptions<typeof ASlideGroup>;
