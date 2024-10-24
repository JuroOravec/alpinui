// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Divider } from './VDivider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDividerProps as makeADividerProps,
  VDividerSlots as ADividerSlots,
} from './VDivider.base';

export const ADivider = defineAlpineComponent({
  ..._Divider,
  name: 'ADivider',
});

export type ADivider = AlpineInstanceFromOptions<typeof ADivider>;
