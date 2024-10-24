// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _StepperWindow } from './VStepperWindow.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVStepperWindowProps as makeAStepperWindowProps,
  VStepperWindowSlots as AStepperWindowSlots,
} from './VStepperWindow.base';

export const AStepperWindow = defineAlpineComponent({
  ..._StepperWindow,
  name: 'AStepperWindow',
});

export type AStepperWindow = AlpineInstanceFromOptions<typeof AStepperWindow>;
