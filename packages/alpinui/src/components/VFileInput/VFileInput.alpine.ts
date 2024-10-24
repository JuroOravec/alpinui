// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _FileInput } from './VFileInput.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVFileInputProps as makeAFileInputProps,
  VFileInputSlots as AFileInputSlots,
} from './VFileInput.base';

export const AFileInput = defineAlpineComponent({
  ..._FileInput,
  name: 'AFileInput',
});

export type AFileInput = AlpineInstanceFromOptions<typeof AFileInput>;
