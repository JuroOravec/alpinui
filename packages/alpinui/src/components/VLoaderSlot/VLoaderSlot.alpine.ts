// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _LoaderSlot } from './VLoaderSlot.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVLoaderSlotProps as makeALoaderSlotProps,
  VLoaderSlotSlots as ALoaderSlotSlots,
  LoaderSlotProps,
} from './VLoaderSlot.base';

export const ALoaderSlot = defineAlpineComponent({
  ..._LoaderSlot,
  name: 'ALoaderSlot',
});

export type ALoaderSlot = AlpineInstanceFromOptions<typeof ALoaderSlot>;
