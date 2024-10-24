// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _StepperActions } from './VStepperActions.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVStepperActionsProps as makeAStepperActionsProps,
  VStepperActionsSlots as AStepperActionsSlots,
} from './VStepperActions.base';

export const AStepperActions = defineAlpineComponent({
  ..._StepperActions,
  name: 'AStepperActions',
});

export type AStepperActions = AlpineInstanceFromOptions<typeof AStepperActions>;
