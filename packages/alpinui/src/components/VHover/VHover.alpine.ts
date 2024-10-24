// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Hover } from './VHover.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVHoverProps as makeAHoverProps,
  VHoverSlots as AHoverSlots,
} from './VHover.base';

export const AHover = defineAlpineComponent({
  ..._Hover,
  name: 'AHover',
});

export type AHover = AlpineInstanceFromOptions<typeof AHover>;
