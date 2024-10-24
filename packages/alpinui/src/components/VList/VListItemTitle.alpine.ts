// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListItemTitle } from './VListItemTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VListItemTitleSlots as AListItemTitleSlots } from './VListItemTitle.base';

export const AListItemTitle = defineAlpineComponent({
  ..._ListItemTitle,
  name: 'AListItemTitle',
});

export type AListItemTitle = AlpineInstanceFromOptions<typeof AListItemTitle>;
