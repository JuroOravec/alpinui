// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ProgressLinear } from './VProgressLinear.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVProgressLinearProps as makeAProgressLinearProps,
  VProgressLinearSlots as AProgressLinearSlots,
} from './VProgressLinear.base';

export const AProgressLinear = defineAlpineComponent({
  ..._ProgressLinear,
  name: 'AProgressLinear',
});

export type AProgressLinear = AlpineInstanceFromOptions<typeof AProgressLinear>;
