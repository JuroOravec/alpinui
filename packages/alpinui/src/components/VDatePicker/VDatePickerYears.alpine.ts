// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DatePickerYears } from './VDatePickerYears.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDatePickerYearsProps as makeADatePickerYearsProps,
  VDatePickerYearsSlots as ADatePickerYearsSlots,
} from './VDatePickerYears.base';

export const ADatePickerYears = defineAlpineComponent({
  ..._DatePickerYears,
  name: 'ADatePickerYears',
});

export type ADatePickerYears = AlpineInstanceFromOptions<typeof ADatePickerYears>;
