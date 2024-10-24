// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SelectionControl } from './VSelectionControl.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSelectionControlProps as makeASelectionControlProps,
  VSelectionControlSlots as ASelectionControlSlots,
  SelectionControlSlot,
  useSelectionControl,
} from './VSelectionControl.base';

export const ASelectionControl = defineAlpineComponent({
  ..._SelectionControl,
  name: 'ASelectionControl',
});

export type ASelectionControl = AlpineInstanceFromOptions<typeof ASelectionControl>;
