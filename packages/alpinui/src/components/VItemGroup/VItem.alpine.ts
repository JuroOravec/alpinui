// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Item } from './VItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVItemProps as makeAItemProps,
  VItemSlots as AItemSlots,
} from './VItem.base';

export const AItem = defineAlpineComponent({
  ..._Item,
  name: 'AItem',
});

export type AItem = AlpineInstanceFromOptions<typeof AItem>;
