// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _LayoutItem } from './VLayoutItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVLayoutItemProps as makeALayoutItemProps,
  VLayoutItemSlots as ALayoutItemSlots,
} from './VLayoutItem.base';

export const ALayoutItem = defineAlpineComponent({
  ..._LayoutItem,
  name: 'ALayoutItem',
});

export type ALayoutItem = AlpineInstanceFromOptions<typeof ALayoutItem>;
