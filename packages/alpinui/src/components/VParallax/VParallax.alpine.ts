// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Parallax } from './VParallax.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVParallaxProps as makeAParallaxProps,
  VParallaxSlots as AParallaxSlots,
} from './VParallax.base';

export const AParallax = defineAlpineComponent({
  ..._Parallax,
  name: 'AParallax',
});

export type AParallax = AlpineInstanceFromOptions<typeof AParallax>;
