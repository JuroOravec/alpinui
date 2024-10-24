// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _TextField } from './VTextField.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTextFieldProps as makeATextFieldProps,
  VTextFieldSlots as ATextFieldSlots,
} from './VTextField.base';

export const ATextField = defineAlpineComponent({
  ..._TextField,
  name: 'ATextField',
});

export type ATextField = AlpineInstanceFromOptions<typeof ATextField>;
