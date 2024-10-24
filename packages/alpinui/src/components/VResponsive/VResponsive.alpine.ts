// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Responsive } from './VResponsive.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVResponsiveProps as makeAResponsiveProps,
  VResponsiveSlots as AResponsiveSlots,
} from './VResponsive.base';

export const AResponsive = defineAlpineComponent({
  ..._Responsive,
  name: 'AResponsive',
});

export type AResponsive = AlpineInstanceFromOptions<typeof AResponsive>;
