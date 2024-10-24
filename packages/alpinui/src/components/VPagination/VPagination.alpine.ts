// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Pagination } from './VPagination.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVPaginationProps as makeAPaginationProps,
  VPaginationSlots as APaginationSlots,
} from './VPagination.base';

export const APagination = defineAlpineComponent({
  ..._Pagination,
  name: 'APagination',
});

export type APagination = AlpineInstanceFromOptions<typeof APagination>;
