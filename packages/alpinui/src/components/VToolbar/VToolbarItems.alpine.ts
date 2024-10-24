// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ToolbarItems } from './VToolbarItems.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVToolbarItemsProps as makeAToolbarItemsProps,
  VToolbarItemsSlots as AToolbarItemsSlots,
} from './VToolbarItems.base';

export const AToolbarItems = defineAlpineComponent({
  ..._ToolbarItems,
  name: 'AToolbarItems',
});

export type AToolbarItems = AlpineInstanceFromOptions<typeof AToolbarItems>;
