// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _FieldLabel } from './VFieldLabel.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVFieldLabelProps as makeAFieldLabelProps,
  VFieldLabelSlots as AFieldLabelSlots,
} from './VFieldLabel.base';

export const AFieldLabel = defineAlpineComponent({
  ..._FieldLabel,
  name: 'AFieldLabel',
});

export type AFieldLabel = AlpineInstanceFromOptions<typeof AFieldLabel>;
