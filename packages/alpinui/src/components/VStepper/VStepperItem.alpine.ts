// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _StepperItem } from './VStepperItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVStepperItemProps as makeAStepperItemProps,
  makeStepperItemProps,
  VStepperItemSlots as AStepperItemSlots,
  StepperItem,
  StepperItemSlot,
  ValidationRule,
} from './VStepperItem.base';

export const AStepperItem = defineAlpineComponent({
  ..._StepperItem,
  name: 'AStepperItem',
});

export type AStepperItem = AlpineInstanceFromOptions<typeof AStepperItem>;
