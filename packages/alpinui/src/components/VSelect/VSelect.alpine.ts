// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Select } from './VSelect.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSelectProps as makeASelectProps,
  VSelectSlots as ASelectSlots,
  ItemType,
} from './VSelect.base';

export const ASelect = defineAlpineComponent({
  ..._Select,
  name: 'ASelect',
});

export type ASelect = AlpineInstanceFromOptions<typeof ASelect>;
