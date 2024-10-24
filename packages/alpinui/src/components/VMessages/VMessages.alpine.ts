// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Messages } from './VMessages.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVMessagesProps as makeAMessagesProps,
  VMessagesSlots as AMessagesSlots,
  VMessageSlot as AMessageSlot,
} from './VMessages.base';

export const AMessages = defineAlpineComponent({
  ..._Messages,
  name: 'AMessages',
});

export type AMessages = AlpineInstanceFromOptions<typeof AMessages>;
