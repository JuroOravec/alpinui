// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BannerActions } from './VBannerActions.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBannerActionsProps as makeABannerActionsProps,
  VBannerActionsSlots as ABannerActionsSlots,
} from './VBannerActions.base';

export const ABannerActions = defineAlpineComponent({
  ..._BannerActions,
  name: 'ABannerActions',
});

export type ABannerActions = AlpineInstanceFromOptions<typeof ABannerActions>;
