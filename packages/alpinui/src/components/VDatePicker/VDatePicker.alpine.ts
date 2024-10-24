// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DatePicker } from './VDatePicker.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDatePickerProps as makeADatePickerProps,
  VDatePickerSlots as ADatePickerSlots,
} from './VDatePicker.base';

export const ADatePicker = defineAlpineComponent({
  ..._DatePicker,
  name: 'ADatePicker',
});

export type ADatePicker = AlpineInstanceFromOptions<typeof ADatePicker>;
