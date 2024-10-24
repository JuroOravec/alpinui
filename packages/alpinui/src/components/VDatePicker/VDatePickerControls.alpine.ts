// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DatePickerControls } from './VDatePickerControls.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDatePickerControlsProps as makeADatePickerControlsProps,
  VDatePickerControlsSlots as ADatePickerControlsSlots,
} from './VDatePickerControls.base';

export const ADatePickerControls = defineAlpineComponent({
  ..._DatePickerControls,
  name: 'ADatePickerControls',
});

export type ADatePickerControls = AlpineInstanceFromOptions<typeof ADatePickerControls>;
