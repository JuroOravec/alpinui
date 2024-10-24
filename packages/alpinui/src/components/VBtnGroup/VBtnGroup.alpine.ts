// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BtnGroup } from './VBtnGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBtnGroupProps as makeABtnGroupProps,
  VBtnGroupSlots as ABtnGroupSlots,
} from './VBtnGroup.base';

export const ABtnGroup = defineAlpineComponent({
  ..._BtnGroup,
  name: 'ABtnGroup',
});

export type ABtnGroup = AlpineInstanceFromOptions<typeof ABtnGroup>;
