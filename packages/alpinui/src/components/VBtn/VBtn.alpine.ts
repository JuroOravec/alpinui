// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Btn } from './VBtn.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBtnProps as makeABtnProps,
  VBtnSlots as ABtnSlots,
} from './VBtn.base';

export const ABtn = defineAlpineComponent({
  ..._Btn,
  name: 'ABtn',
});

export type ABtn = AlpineInstanceFromOptions<typeof ABtn>;
