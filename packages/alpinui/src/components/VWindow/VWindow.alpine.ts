// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Window } from './VWindow.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVWindowProps as makeAWindowProps,
  VWindowSlots as AWindowSlots,
} from './VWindow.base';

export const AWindow = defineAlpineComponent({
  ..._Window,
  name: 'AWindow',
});

export type AWindow = AlpineInstanceFromOptions<typeof AWindow>;
