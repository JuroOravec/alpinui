// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListItemAction } from './VListItemAction.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListItemActionProps as makeAListItemActionProps,
  VListItemActionSlots as AListItemActionSlots,
} from './VListItemAction.base';

export const AListItemAction = defineAlpineComponent({
  ..._ListItemAction,
  name: 'AListItemAction',
});

export type AListItemAction = AlpineInstanceFromOptions<typeof AListItemAction>;
