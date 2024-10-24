// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Tabs } from './VTabs.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTabsProps as makeATabsProps,
  VTabsSlots as ATabsSlots,
  VTabsSlot as ATabsSlot,
  TabItem,
} from './VTabs.base';

export const ATabs = defineAlpineComponent({
  ..._Tabs,
  name: 'ATabs',
});

export type ATabs = AlpineInstanceFromOptions<typeof ATabs>;
