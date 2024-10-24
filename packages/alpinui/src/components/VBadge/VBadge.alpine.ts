// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Badge } from './VBadge.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBadgeProps as makeABadgeProps,
  VBadgeSlots as ABadgeSlots,
} from './VBadge.base';

export const ABadge = defineAlpineComponent({
  ..._Badge,
  name: 'ABadge',
});

export type ABadge = AlpineInstanceFromOptions<typeof ABadge>;
