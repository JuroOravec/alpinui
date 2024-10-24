// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Main } from './VMain.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVMainProps as makeAMainProps,
  VMainSlots as AMainSlots,
} from './VMain.base';

export const AMain = defineAlpineComponent({
  ..._Main,
  name: 'AMain',
});

export type AMain = AlpineInstanceFromOptions<typeof AMain>;
