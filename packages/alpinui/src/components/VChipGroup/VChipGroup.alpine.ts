// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ChipGroup } from './VChipGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVChipGroupProps as makeAChipGroupProps,
  VChipGroupSlots as AChipGroupSlots,
  VChipGroupSymbol as AChipGroupSymbol,
} from './VChipGroup.base';

export const AChipGroup = defineAlpineComponent({
  ..._ChipGroup,
  name: 'AChipGroup',
});

export type AChipGroup = AlpineInstanceFromOptions<typeof AChipGroup>;
