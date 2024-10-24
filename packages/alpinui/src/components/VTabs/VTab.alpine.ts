// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Tab } from './VTab.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTabProps as makeATabProps,
  VTabSlots as ATabSlots,
} from './VTab.base';

export const ATab = defineAlpineComponent({
  ..._Tab,
  name: 'ATab',
});

export type ATab = AlpineInstanceFromOptions<typeof ATab>;
