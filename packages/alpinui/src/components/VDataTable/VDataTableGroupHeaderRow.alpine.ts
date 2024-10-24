// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableGroupHeaderRow } from './VDataTableGroupHeaderRow.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableGroupHeaderRowProps as makeADataTableGroupHeaderRowProps,
  VDataTableGroupHeaderRowSlots as ADataTableGroupHeaderRowSlots,
} from './VDataTableGroupHeaderRow.base';

export const ADataTableGroupHeaderRow = defineAlpineComponent({
  ..._DataTableGroupHeaderRow,
  name: 'ADataTableGroupHeaderRow',
});

export type ADataTableGroupHeaderRow = AlpineInstanceFromOptions<typeof ADataTableGroupHeaderRow>;
