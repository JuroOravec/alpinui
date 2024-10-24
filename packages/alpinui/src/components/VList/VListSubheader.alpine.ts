// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListSubheader } from './VListSubheader.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListSubheaderProps as makeAListSubheaderProps,
  VListSubheaderSlots as AListSubheaderSlots,
} from './VListSubheader.base';

export const AListSubheader = defineAlpineComponent({
  ..._ListSubheader,
  name: 'AListSubheader',
});

export type AListSubheader = AlpineInstanceFromOptions<typeof AListSubheader>;
