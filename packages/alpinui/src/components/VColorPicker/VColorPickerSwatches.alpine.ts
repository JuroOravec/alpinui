// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ColorPickerSwatches } from './VColorPickerSwatches.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVColorPickerSwatchesProps as makeAColorPickerSwatchesProps,
  VColorPickerSwatchesSlots as AColorPickerSwatchesSlots,
} from './VColorPickerSwatches.base';

export const AColorPickerSwatches = defineAlpineComponent({
  ..._ColorPickerSwatches,
  name: 'AColorPickerSwatches',
});

export type AColorPickerSwatches = AlpineInstanceFromOptions<typeof AColorPickerSwatches>;
