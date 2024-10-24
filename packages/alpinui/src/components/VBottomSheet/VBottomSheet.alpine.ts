// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BottomSheet } from './VBottomSheet.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBottomSheetProps as makeABottomSheetProps,
  VBottomSheetSlots as ABottomSheetSlots,
} from './VBottomSheet.base';

export const ABottomSheet = defineAlpineComponent({
  ..._BottomSheet,
  name: 'ABottomSheet',
});

export type ABottomSheet = AlpineInstanceFromOptions<typeof ABottomSheet>;
