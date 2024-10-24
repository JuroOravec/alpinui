// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ColorPickerPreview } from './VColorPickerPreview.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVColorPickerPreviewProps as makeAColorPickerPreviewProps,
  VColorPickerPreviewSlots as AColorPickerPreviewSlots,
} from './VColorPickerPreview.base';

export const AColorPickerPreview = defineAlpineComponent({
  ..._ColorPickerPreview,
  name: 'AColorPickerPreview',
});

export type AColorPickerPreview = AlpineInstanceFromOptions<typeof AColorPickerPreview>;
