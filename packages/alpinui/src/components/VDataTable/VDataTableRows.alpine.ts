// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableRows } from './VDataTableRows.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableRowsProps as makeADataTableRowsProps,
  VDataTableRowsSlots as ADataTableRowsSlots,
} from './VDataTableRows.base';

export const ADataTableRows = defineAlpineComponent({
  ..._DataTableRows,
  name: 'ADataTableRows',
});

export type ADataTableRows = AlpineInstanceFromOptions<typeof ADataTableRows>;
