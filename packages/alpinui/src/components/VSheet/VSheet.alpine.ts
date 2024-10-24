// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Sheet } from './VSheet.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSheetProps as makeASheetProps,
  VSheetSlots as ASheetSlots,
} from './VSheet.base';

export const ASheet = defineAlpineComponent({
  ..._Sheet,
  name: 'ASheet',
});

export type ASheet = AlpineInstanceFromOptions<typeof ASheet>;
