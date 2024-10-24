// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Toolbar } from './VToolbar.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVToolbarProps as makeAToolbarProps,
  VToolbarSlots as AToolbarSlots,
} from './VToolbar.base';

export const AToolbar = defineAlpineComponent({
  ..._Toolbar,
  name: 'AToolbar',
});

export type AToolbar = AlpineInstanceFromOptions<typeof AToolbar>;
