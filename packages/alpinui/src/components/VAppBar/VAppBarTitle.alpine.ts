// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _AppBarTitle } from './VAppBarTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVAppBarTitleProps as makeAAppBarTitleProps,
  VAppBarTitleSlots as AAppBarTitleSlots,
} from './VAppBarTitle.base';

export const AAppBarTitle = defineAlpineComponent({
  ..._AppBarTitle,
  name: 'AAppBarTitle',
});

export type AAppBarTitle = AlpineInstanceFromOptions<typeof AAppBarTitle>;
