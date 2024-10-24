// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DatePickerMonths } from './VDatePickerMonths.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDatePickerMonthsProps as makeADatePickerMonthsProps,
  VDatePickerMonthsSlots as ADatePickerMonthsSlots,
} from './VDatePickerMonths.base';

export const ADatePickerMonths = defineAlpineComponent({
  ..._DatePickerMonths,
  name: 'ADatePickerMonths',
});

export type ADatePickerMonths = AlpineInstanceFromOptions<typeof ADatePickerMonths>;
