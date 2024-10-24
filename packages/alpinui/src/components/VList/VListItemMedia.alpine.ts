// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListItemMedia } from './VListItemMedia.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListItemMediaProps as makeAListItemMediaProps,
  VListItemMediaSlots as AListItemMediaSlots,
} from './VListItemMedia.base';

export const AListItemMedia = defineAlpineComponent({
  ..._ListItemMedia,
  name: 'AListItemMedia',
});

export type AListItemMedia = AlpineInstanceFromOptions<typeof AListItemMedia>;
