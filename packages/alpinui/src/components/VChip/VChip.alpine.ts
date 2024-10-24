// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Chip } from './VChip.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVChipProps as makeAChipProps,
  VChipSlots as AChipSlots,
} from './VChip.base';

export const AChip = defineAlpineComponent({
  ..._Chip,
  name: 'AChip',
});

export type AChip = AlpineInstanceFromOptions<typeof AChip>;
