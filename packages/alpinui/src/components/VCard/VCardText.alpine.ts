// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CardText } from './VCardText.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCardTextProps as makeACardTextProps,
  VCardTextSlots as ACardTextSlots,
} from './VCardText.base';

export const ACardText = defineAlpineComponent({
  ..._CardText,
  name: 'ACardText',
});

export type ACardText = AlpineInstanceFromOptions<typeof ACardText>;
