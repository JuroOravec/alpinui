// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Layout } from './VLayout.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVLayoutProps as makeALayoutProps,
  VLayoutSlots as ALayoutSlots,
} from './VLayout.base';

export const ALayout = defineAlpineComponent({
  ..._Layout,
  name: 'ALayout',
});

export type ALayout = AlpineInstanceFromOptions<typeof ALayout>;
