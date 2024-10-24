// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Menu } from './VMenu.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVMenuProps as makeAMenuProps,
  VMenuSlots as AMenuSlots,
} from './VMenu.base';

export const AMenu = defineAlpineComponent({
  ..._Menu,
  name: 'AMenu',
});

export type AMenu = AlpineInstanceFromOptions<typeof AMenu>;
