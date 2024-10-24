// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _StepperHeader } from './VStepperHeader.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VStepperHeaderSlots as AStepperHeaderSlots } from './VStepperHeader.base';

export const AStepperHeader = defineAlpineComponent({
  ..._StepperHeader,
  name: 'AStepperHeader',
});

export type AStepperHeader = AlpineInstanceFromOptions<typeof AStepperHeader>;
