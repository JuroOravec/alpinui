// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ColorPickerCanvas } from './VColorPickerCanvas.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVColorPickerCanvasProps as makeAColorPickerCanvasProps,
  VColorPickerCanvasSlots as AColorPickerCanvasSlots,
} from './VColorPickerCanvas.base';

export const AColorPickerCanvas = defineAlpineComponent({
  ..._ColorPickerCanvas,
  name: 'AColorPickerCanvas',
});

export type AColorPickerCanvas = AlpineInstanceFromOptions<typeof AColorPickerCanvas>;
