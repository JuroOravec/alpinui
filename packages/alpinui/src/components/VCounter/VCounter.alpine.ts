// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Counter } from './VCounter.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCounterProps as makeACounterProps,
  VCounterSlots as ACounterSlots,
  VCounterSlot as ACounterSlot,
} from './VCounter.base';

export const ACounter = defineAlpineComponent({
  ..._Counter,
  name: 'ACounter',
});

export type ACounter = AlpineInstanceFromOptions<typeof ACounter>;
