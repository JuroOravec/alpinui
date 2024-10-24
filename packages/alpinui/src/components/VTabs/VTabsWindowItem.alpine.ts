// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _TabsWindowItem } from './VTabsWindowItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTabsWindowItemProps as makeATabsWindowItemProps,
  VTabsWindowItemSlots as ATabsWindowItemSlots,
} from './VTabsWindowItem.base';

export const ATabsWindowItem = defineAlpineComponent({
  ..._TabsWindowItem,
  name: 'ATabsWindowItem',
});

export type ATabsWindowItem = AlpineInstanceFromOptions<typeof ATabsWindowItem>;
