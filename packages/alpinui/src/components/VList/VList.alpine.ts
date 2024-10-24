// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _List } from './VList.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListProps as makeAListProps,
  VListSlots as AListSlots,
  InternalListItem,
  useListItems,
} from './VList.base';

export const AList = defineAlpineComponent({
  ..._List,
  name: 'AList',
});

export type AList = AlpineInstanceFromOptions<typeof AList>;
