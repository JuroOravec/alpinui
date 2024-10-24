// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Barline } from './VBarline.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBarlineProps as makeABarlineProps,
  VBarlineSlots as ABarlineSlots,
  SparklineText,
  Bar,
  Boundary,
} from './VBarline.base';

export const ABarline = defineAlpineComponent({
  ..._Barline,
  name: 'ABarline',
});

export type ABarline = AlpineInstanceFromOptions<typeof ABarline>;
