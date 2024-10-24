// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Checkbox } from './VCheckbox.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCheckboxProps as makeACheckboxProps,
  VCheckboxSlots as ACheckboxSlots,
} from './VCheckbox.base';

export const ACheckbox = defineAlpineComponent({
  ..._Checkbox,
  name: 'ACheckbox',
});

export type ACheckbox = AlpineInstanceFromOptions<typeof ACheckbox>;
