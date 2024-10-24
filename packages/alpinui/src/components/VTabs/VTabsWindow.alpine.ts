// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _TabsWindow } from './VTabsWindow.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTabsWindowProps as makeATabsWindowProps,
  VTabsWindowSlots as ATabsWindowSlots,
} from './VTabsWindow.base';

export const ATabsWindow = defineAlpineComponent({
  ..._TabsWindow,
  name: 'ATabsWindow',
});

export type ATabsWindow = AlpineInstanceFromOptions<typeof ATabsWindow>;
