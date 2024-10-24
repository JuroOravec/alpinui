// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Table } from './VTable.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTableProps as makeATableProps,
  VTableSlots as ATableSlots,
} from './VTable.base';

export const ATable = defineAlpineComponent({
  ..._Table,
  name: 'ATable',
});

export type ATable = AlpineInstanceFromOptions<typeof ATable>;
