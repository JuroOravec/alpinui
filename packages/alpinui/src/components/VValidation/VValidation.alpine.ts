// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Validation } from './VValidation.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVValidationProps as makeAValidationProps,
  VValidationSlots as AValidationSlots,
} from './VValidation.base';

export const AValidation = defineAlpineComponent({
  ..._Validation,
  name: 'AValidation',
});

export type AValidation = AlpineInstanceFromOptions<typeof AValidation>;
