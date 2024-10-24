// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ToolbarTitle } from './VToolbarTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVToolbarTitleProps as makeAToolbarTitleProps,
  VToolbarTitleSlots as AToolbarTitleSlots,
} from './VToolbarTitle.base';

export const AToolbarTitle = defineAlpineComponent({
  ..._ToolbarTitle,
  name: 'AToolbarTitle',
});

export type AToolbarTitle = AlpineInstanceFromOptions<typeof AToolbarTitle>;
