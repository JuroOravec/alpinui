// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Field } from './VField.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVFieldProps as makeAFieldProps,
  VFieldSlots as AFieldSlots,
} from './VField.base';

export const AField = defineAlpineComponent({
  ..._Field,
  name: 'AField',
});

export type AField = AlpineInstanceFromOptions<typeof AField>;
