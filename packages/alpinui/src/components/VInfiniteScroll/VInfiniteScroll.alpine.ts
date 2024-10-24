// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _InfiniteScroll } from './VInfiniteScroll.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVInfiniteScrollProps as makeAInfiniteScrollProps,
  VInfiniteScrollSlots as AInfiniteScrollSlots,
  VInfiniteScrollIntersectSlots as AInfiniteScrollIntersectSlots,
  InfiniteScrollSide,
  InfiniteScrollStatus,
} from './VInfiniteScroll.base';

export const AInfiniteScroll = defineAlpineComponent({
  ..._InfiniteScroll,
  name: 'AInfiniteScroll',
});

export type AInfiniteScroll = AlpineInstanceFromOptions<typeof AInfiniteScroll>;
