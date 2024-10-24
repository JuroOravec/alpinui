// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CardItem } from './VCardItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCardItemProps as makeACardItemProps,
  VCardItemSlots as ACardItemSlots,
} from './VCardItem.base';

export const ACardItem = defineAlpineComponent({
  ..._CardItem,
  name: 'ACardItem',
});

export type ACardItem = AlpineInstanceFromOptions<typeof ACardItem>;
