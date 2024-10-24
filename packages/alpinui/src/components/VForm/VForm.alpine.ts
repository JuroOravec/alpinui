// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Form } from './VForm.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVFormProps as makeAFormProps,
  VFormSlots as AFormSlots,
} from './VForm.base';

export const AForm = defineAlpineComponent({
  ..._Form,
  name: 'AForm',
});

export type AForm = AlpineInstanceFromOptions<typeof AForm>;
