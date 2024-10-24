// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Picker } from './VPicker.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVPickerProps as makeAPickerProps,
  VPickerSlots as APickerSlots,
} from './VPicker.base';

export const APicker = defineAlpineComponent({
  ..._Picker,
  name: 'APicker',
});

export type APicker = AlpineInstanceFromOptions<typeof APicker>;
