// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Stepper } from './VStepper.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVStepperProps as makeAStepperProps,
  VStepperSlots as AStepperSlots,
  VStepperSlot as AStepperSlot,
} from './VStepper.base';

export const AStepper = defineAlpineComponent({
  ..._Stepper,
  name: 'AStepper',
});

export type AStepper = AlpineInstanceFromOptions<typeof AStepper>;
