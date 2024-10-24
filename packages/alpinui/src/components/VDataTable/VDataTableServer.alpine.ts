// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataTableServer } from './VDataTableServer.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataTableServerProps as makeADataTableServerProps,
  VDataTableServerSlots as ADataTableServerSlots,
} from './VDataTableServer.base';

export const ADataTableServer = defineAlpineComponent({
  ..._DataTableServer,
  name: 'ADataTableServer',
});

export type ADataTableServer = AlpineInstanceFromOptions<typeof ADataTableServer>;
