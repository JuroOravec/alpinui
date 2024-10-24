// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _WindowItem } from './VWindowItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVWindowItemProps as makeAWindowItemProps,
  VWindowItemSlots as AWindowItemSlots,
} from './VWindowItem.base';

export const AWindowItem = defineAlpineComponent({
  ..._WindowItem,
  name: 'AWindowItem',
});

export type AWindowItem = AlpineInstanceFromOptions<typeof AWindowItem>;
