// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListItem } from './VListItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListItemProps as makeAListItemProps,
  VListItemSlots as AListItemSlots,
  ListItemSlot,
  ListItemTitleSlot,
  ListItemSubtitleSlot,
} from './VListItem.base';

export const AListItem = defineAlpineComponent({
  ..._ListItem,
  name: 'AListItem',
});

export type AListItem = AlpineInstanceFromOptions<typeof AListItem>;
