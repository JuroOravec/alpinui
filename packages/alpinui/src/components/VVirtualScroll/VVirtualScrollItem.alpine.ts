// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _VirtualScrollItem } from './VVirtualScrollItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVVirtualScrollItemProps as makeAVirtualScrollItemProps,
  VVirtualScrollItemSlots as AVirtualScrollItemSlots,
} from './VVirtualScrollItem.base';

export const AVirtualScrollItem = defineAlpineComponent({
  ..._VirtualScrollItem,
  name: 'AVirtualScrollItem',
});

export type AVirtualScrollItem = AlpineInstanceFromOptions<typeof AVirtualScrollItem>;
