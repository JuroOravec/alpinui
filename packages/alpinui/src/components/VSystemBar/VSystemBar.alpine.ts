// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SystemBar } from './VSystemBar.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSystemBarProps as makeASystemBarProps,
  VSystemBarSlots as ASystemBarSlots,
} from './VSystemBar.base';

export const ASystemBar = defineAlpineComponent({
  ..._SystemBar,
  name: 'ASystemBar',
});

export type ASystemBar = AlpineInstanceFromOptions<typeof ASystemBar>;
