// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableVirtual } from './VDataTableVirtual.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableVirtualProps as makeADataTableVirtualProps,
  VDataTableVirtualSlots as ADataTableVirtualSlots,
} from './VDataTableVirtual.base';

export const ADataTableVirtual = defineAlpineComponent({
  ..._DataTableVirtual,
  name: 'ADataTableVirtual',
});

export type ADataTableVirtual = AlpineInstanceFromOptions<typeof ADataTableVirtual>;
