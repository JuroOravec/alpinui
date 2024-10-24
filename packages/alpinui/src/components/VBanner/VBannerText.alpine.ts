// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BannerText } from './VBannerText.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VBannerTextSlots as ABannerTextSlots } from './VBannerText.base';

export const ABannerText = defineAlpineComponent({
  ..._BannerText,
  name: 'ABannerText',
});

export type ABannerText = AlpineInstanceFromOptions<typeof ABannerText>;
