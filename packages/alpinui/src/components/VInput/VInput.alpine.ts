// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Input } from './VInput.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVInputProps as makeAInputProps,
  VInputSlots as AInputSlots,
  VInputSlot as AInputSlot,
} from './VInput.base';

export const AInput = defineAlpineComponent({
  ..._Input,
  name: 'AInput',
});

export type AInput = AlpineInstanceFromOptions<typeof AInput>;
