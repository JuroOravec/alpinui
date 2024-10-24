// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Banner } from './VBanner.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBannerProps as makeABannerProps,
  VBannerSlots as ABannerSlots,
} from './VBanner.base';

export const ABanner = defineAlpineComponent({
  ..._Banner,
  name: 'ABanner',
});

export type ABanner = AlpineInstanceFromOptions<typeof ABanner>;
