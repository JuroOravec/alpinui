// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DataIterator } from './VDataIterator.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDataIteratorProps as makeADataIteratorProps,
  VDataIteratorSlots as ADataIteratorSlots,
} from './VDataIterator.base';

export const ADataIterator = defineAlpineComponent({
  ..._DataIterator,
  name: 'ADataIterator',
});

export type ADataIterator = AlpineInstanceFromOptions<typeof ADataIterator>;
