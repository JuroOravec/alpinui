// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Combobox } from './VCombobox.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVComboboxProps as makeAComboboxProps,
  VComboboxSlots as AComboboxSlots,
} from './VCombobox.base';

export const ACombobox = defineAlpineComponent({
  ..._Combobox,
  name: 'ACombobox',
});

export type ACombobox = AlpineInstanceFromOptions<typeof ACombobox>;
