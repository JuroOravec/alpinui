// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ProgressCircular } from './VProgressCircular.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVProgressCircularProps as makeAProgressCircularProps,
  VProgressCircularSlots as AProgressCircularSlots,
} from './VProgressCircular.base';

export const AProgressCircular = defineAlpineComponent({
  ..._ProgressCircular,
  name: 'AProgressCircular',
});

export type AProgressCircular = AlpineInstanceFromOptions<typeof AProgressCircular>;
