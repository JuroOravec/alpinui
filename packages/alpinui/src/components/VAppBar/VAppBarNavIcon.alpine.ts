// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _AppBarNavIcon } from './VAppBarNavIcon.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVAppBarNavIconProps as makeAAppBarNavIconProps,
  VAppBarNavIconSlots as AAppBarNavIconSlots,
} from './VAppBarNavIcon.base';

export const AAppBarNavIcon = defineAlpineComponent({
  ..._AppBarNavIcon,
  name: 'AAppBarNavIcon',
});

export type AAppBarNavIcon = AlpineInstanceFromOptions<typeof AAppBarNavIcon>;
