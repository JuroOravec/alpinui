// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _VirtualScroll } from './VVirtualScroll.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVVirtualScrollProps as makeAVirtualScrollProps,
  VVirtualScrollSlots as AVirtualScrollSlots,
} from './VVirtualScroll.base';

export const AVirtualScroll = defineAlpineComponent({
  ..._VirtualScroll,
  name: 'AVirtualScroll',
});

export type AVirtualScroll = AlpineInstanceFromOptions<typeof AVirtualScroll>;
