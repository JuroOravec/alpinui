// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CardSubtitle } from './VCardSubtitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCardSubtitleProps as makeACardSubtitleProps,
  VCardSubtitleSlots as ACardSubtitleSlots,
} from './VCardSubtitle.base';

export const ACardSubtitle = defineAlpineComponent({
  ..._CardSubtitle,
  name: 'ACardSubtitle',
});

export type ACardSubtitle = AlpineInstanceFromOptions<typeof ACardSubtitle>;
