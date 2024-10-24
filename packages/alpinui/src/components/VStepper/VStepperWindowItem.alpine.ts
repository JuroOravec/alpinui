// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _StepperWindowItem } from './VStepperWindowItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVStepperWindowItemProps as makeAStepperWindowItemProps,
  VStepperWindowItemSlots as AStepperWindowItemSlots,
} from './VStepperWindowItem.base';

export const AStepperWindowItem = defineAlpineComponent({
  ..._StepperWindowItem,
  name: 'AStepperWindowItem',
});

export type AStepperWindowItem = AlpineInstanceFromOptions<typeof AStepperWindowItem>;
