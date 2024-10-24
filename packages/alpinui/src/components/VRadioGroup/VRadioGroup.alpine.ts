// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _RadioGroup } from './VRadioGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVRadioGroupProps as makeARadioGroupProps,
  VRadioGroupSlots as ARadioGroupSlots,
} from './VRadioGroup.base';

export const ARadioGroup = defineAlpineComponent({
  ..._RadioGroup,
  name: 'ARadioGroup',
});

export type ARadioGroup = AlpineInstanceFromOptions<typeof ARadioGroup>;
