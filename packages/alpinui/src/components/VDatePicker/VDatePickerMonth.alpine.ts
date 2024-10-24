// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DatePickerMonth } from './VDatePickerMonth.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDatePickerMonthProps as makeADatePickerMonthProps,
  VDatePickerMonthSlots as ADatePickerMonthSlots,
} from './VDatePickerMonth.base';

export const ADatePickerMonth = defineAlpineComponent({
  ..._DatePickerMonth,
  name: 'ADatePickerMonth',
});

export type ADatePickerMonth = AlpineInstanceFromOptions<typeof ADatePickerMonth>;
