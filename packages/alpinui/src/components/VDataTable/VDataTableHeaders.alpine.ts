// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableHeaders } from './VDataTableHeaders.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableHeadersProps as makeADataTableHeadersProps,
  VDataTableHeadersSlots as ADataTableHeadersSlots,
  HeadersSlotProps,
  VDataTableHeaderCellColumnSlotProps,
} from './VDataTableHeaders.base';

export const ADataTableHeaders = defineAlpineComponent({
  ..._DataTableHeaders,
  name: 'ADataTableHeaders',
});

export type ADataTableHeaders = AlpineInstanceFromOptions<typeof ADataTableHeaders>;
