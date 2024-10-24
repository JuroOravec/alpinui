// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DatePickerHeader } from './VDatePickerHeader.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDatePickerHeaderProps as makeADatePickerHeaderProps,
  VDatePickerHeaderSlots as ADatePickerHeaderSlots,
} from './VDatePickerHeader.base';

export const ADatePickerHeader = defineAlpineComponent({
  ..._DatePickerHeader,
  name: 'ADatePickerHeader',
});

export type ADatePickerHeader = AlpineInstanceFromOptions<typeof ADatePickerHeader>;
