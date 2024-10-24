// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ItemGroup } from './VItemGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVItemGroupProps as makeAItemGroupProps,
  VItemGroupSlots as AItemGroupSlots,
  VItemGroupSymbol as AItemGroupSymbol,
} from './VItemGroup.base';

export const AItemGroup = defineAlpineComponent({
  ..._ItemGroup,
  name: 'AItemGroup',
});

export type AItemGroup = AlpineInstanceFromOptions<typeof AItemGroup>;
