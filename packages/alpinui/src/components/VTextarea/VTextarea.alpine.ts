// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Textarea } from './VTextarea.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTextareaProps as makeATextareaProps,
  VTextareaSlots as ATextareaSlots,
} from './VTextarea.base';

export const ATextarea = defineAlpineComponent({
  ..._Textarea,
  name: 'ATextarea',
});

export type ATextarea = AlpineInstanceFromOptions<typeof ATextarea>;
