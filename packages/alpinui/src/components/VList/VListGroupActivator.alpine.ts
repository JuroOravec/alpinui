// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListGroupActivator } from './VListGroupActivator.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListGroupActivatorProps as makeAListGroupActivatorProps,
  VListGroupActivatorSlots as AListGroupActivatorSlots,
} from './VListGroupActivator.base';

export const AListGroupActivator = defineAlpineComponent({
  ..._ListGroupActivator,
  name: 'AListGroupActivator',
});

export type AListGroupActivator = AlpineInstanceFromOptions<typeof AListGroupActivator>;
