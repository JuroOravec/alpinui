// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SelectionControlGroup } from './VSelectionControlGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSelectionControlGroupProps as makeASelectionControlGroupProps,
  VSelectionControlGroupSlots as ASelectionControlGroupSlots,
  makeSelectionControlGroupProps,
  VSelectionControlGroupSymbol as ASelectionControlGroupSymbol,
  VSelectionGroupContext as ASelectionGroupContext,
} from './VSelectionControlGroup.base';

export const ASelectionControlGroup = defineAlpineComponent({
  ..._SelectionControlGroup,
  name: 'ASelectionControlGroup',
});

export type ASelectionControlGroup = AlpineInstanceFromOptions<typeof ASelectionControlGroup>;
