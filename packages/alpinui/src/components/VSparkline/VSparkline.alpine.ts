// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Sparkline } from './VSparkline.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSparklineProps as makeASparklineProps,
  VSparklineSlots as ASparklineSlots,
} from './VSparkline.base';

export const ASparkline = defineAlpineComponent({
  ..._Sparkline,
  name: 'ASparkline',
});

export type ASparkline = AlpineInstanceFromOptions<typeof ASparkline>;
