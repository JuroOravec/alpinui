// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BottomNavigation } from './VBottomNavigation.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBottomNavigationProps as makeABottomNavigationProps,
  VBottomNavigationSlots as ABottomNavigationSlots,
} from './VBottomNavigation.base';

export const ABottomNavigation = defineAlpineComponent({
  ..._BottomNavigation,
  name: 'ABottomNavigation',
});

export type ABottomNavigation = AlpineInstanceFromOptions<typeof ABottomNavigation>;
