// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _AppBar } from './VAppBar.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVAppBarProps as makeAAppBarProps,
  VAppBarSlots as AAppBarSlots,
} from './VAppBar.base';

export const AAppBar = defineAlpineComponent({
  ..._AppBar,
  name: 'AAppBar',
});

export type AAppBar = AlpineInstanceFromOptions<typeof AAppBar>;
