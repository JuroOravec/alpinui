// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ColorPickerEdit } from './VColorPickerEdit.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVColorPickerEditProps as makeAColorPickerEditProps,
  VColorPickerEditSlots as AColorPickerEditSlots,
} from './VColorPickerEdit.base';

export const AColorPickerEdit = defineAlpineComponent({
  ..._ColorPickerEdit,
  name: 'AColorPickerEdit',
});

export type AColorPickerEdit = AlpineInstanceFromOptions<typeof AColorPickerEdit>;
