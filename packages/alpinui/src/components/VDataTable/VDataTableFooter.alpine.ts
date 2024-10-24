// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableFooter } from './VDataTableFooter.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableFooterProps as makeADataTableFooterProps,
  VDataTableFooterSlots as ADataTableFooterSlots,
} from './VDataTableFooter.base';

export const ADataTableFooter = defineAlpineComponent({
  ..._DataTableFooter,
  name: 'ADataTableFooter',
});

export type ADataTableFooter = AlpineInstanceFromOptions<typeof ADataTableFooter>;
