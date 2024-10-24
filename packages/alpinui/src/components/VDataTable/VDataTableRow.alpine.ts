// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableRow } from './VDataTableRow.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableRowProps as makeADataTableRowProps,
  VDataTableRowSlots as ADataTableRowSlots,
} from './VDataTableRow.base';

export const ADataTableRow = defineAlpineComponent({
  ..._DataTableRow,
  name: 'ADataTableRow',
});

export type ADataTableRow = AlpineInstanceFromOptions<typeof ADataTableRow>;
