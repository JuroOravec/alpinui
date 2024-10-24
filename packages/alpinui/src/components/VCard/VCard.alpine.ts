// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Card } from './VCard.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCardProps as makeACardProps,
  VCardSlots as ACardSlots,
} from './VCard.base';

export const ACard = defineAlpineComponent({
  ..._Card,
  name: 'ACard',
});

export type ACard = AlpineInstanceFromOptions<typeof ACard>;
