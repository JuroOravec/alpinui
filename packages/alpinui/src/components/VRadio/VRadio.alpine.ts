// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Radio } from './VRadio.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVRadioProps as makeARadioProps,
  VRadioSlots as ARadioSlots,
} from './VRadio.base';

export const ARadio = defineAlpineComponent({
  ..._Radio,
  name: 'ARadio',
});

export type ARadio = AlpineInstanceFromOptions<typeof ARadio>;
