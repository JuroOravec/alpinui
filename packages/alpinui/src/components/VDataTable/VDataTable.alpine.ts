// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTable } from './VDataTable.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableProps as makeADataTableProps,
  VDataTableSlots as ADataTableSlots,
  VDataTableSlotProps as ADataTableSlotProps,
  makeDataTableProps,
} from './VDataTable.base';

export const ADataTable = defineAlpineComponent({
  ..._DataTable,
  name: 'ADataTable',
});

export type ADataTable = AlpineInstanceFromOptions<typeof ADataTable>;
