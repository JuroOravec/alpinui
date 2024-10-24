// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableColumn } from './VDataTableColumn.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableColumnProps as makeADataTableColumnProps,
  VDataTableColumnSlots as ADataTableColumnSlots,
} from './VDataTableColumn.base';

export const ADataTableColumn = defineAlpineComponent({
  ..._DataTableColumn,
  name: 'ADataTableColumn',
});

export type ADataTableColumn = AlpineInstanceFromOptions<typeof ADataTableColumn>;
