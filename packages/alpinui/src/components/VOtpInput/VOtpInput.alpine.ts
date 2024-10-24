// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _OtpInput } from './VOtpInput.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVOtpInputProps as makeAOtpInputProps,
  VOtpInputSlots as AOtpInputSlots,
} from './VOtpInput.base';

export const AOtpInput = defineAlpineComponent({
  ..._OtpInput,
  name: 'AOtpInput',
});

export type AOtpInput = AlpineInstanceFromOptions<typeof AOtpInput>;
