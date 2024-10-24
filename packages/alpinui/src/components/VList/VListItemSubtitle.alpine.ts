// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListItemSubtitle } from './VListItemSubtitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListItemSubtitleProps as makeAListItemSubtitleProps,
  VListItemSubtitleSlots as AListItemSubtitleSlots,
} from './VListItemSubtitle.base';

export const AListItemSubtitle = defineAlpineComponent({
  ..._ListItemSubtitle,
  name: 'AListItemSubtitle',
});

export type AListItemSubtitle = AlpineInstanceFromOptions<typeof AListItemSubtitle>;
