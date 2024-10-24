// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BtnToggle } from './VBtnToggle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBtnToggleProps as makeABtnToggleProps,
  VBtnToggleSlots as ABtnToggleSlots,
  VBtnToggleSymbol as ABtnToggleSymbol,
} from './VBtnToggle.base';

export const ABtnToggle = defineAlpineComponent({
  ..._BtnToggle,
  name: 'ABtnToggle',
});

export type ABtnToggle = AlpineInstanceFromOptions<typeof ABtnToggle>;
