// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Fab } from './VFab.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVFabProps as makeAFabProps,
  VFabSlots as AFabSlots,
} from './VFab.base';

export const AFab = defineAlpineComponent({
  ..._Fab,
  name: 'AFab',
});

export type AFab = AlpineInstanceFromOptions<typeof AFab>;
