// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ColorPicker } from './VColorPicker.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVColorPickerProps as makeAColorPickerProps,
  VColorPickerSlots as AColorPickerSlots,
} from './VColorPicker.base';

export const AColorPicker = defineAlpineComponent({
  ..._ColorPicker,
  name: 'AColorPicker',
});

export type AColorPicker = AlpineInstanceFromOptions<typeof AColorPicker>;
