// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _NavigationDrawer } from './VNavigationDrawer.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVNavigationDrawerProps as makeANavigationDrawerProps,
  VNavigationDrawerSlots as ANavigationDrawerSlots,
  VNavigationDrawerImageSlot as AVNavigationDrawerImageSlot,
} from './VNavigationDrawer.base';

export const ANavigationDrawer = defineAlpineComponent({
  ..._NavigationDrawer,
  name: 'ANavigationDrawer',
});

export type ANavigationDrawer = AlpineInstanceFromOptions<typeof ANavigationDrawer>;
