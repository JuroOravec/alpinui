// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListChildren } from './VListChildren.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListChildrenProps as makeAListChildrenProps,
  VListChildrenSlots as AListChildrenSlots,
} from './VListChildren.base';

export const AListChildren = defineAlpineComponent({
  ..._ListChildren,
  name: 'AListChildren',
});

export type AListChildren = AlpineInstanceFromOptions<typeof AListChildren>;
