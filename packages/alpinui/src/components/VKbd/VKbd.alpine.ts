// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Kbd } from './VKbd.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VKbdSlots as AKbdSlots } from './VKbd.base';

export const AKbd = defineAlpineComponent({
  ..._Kbd,
  name: 'AKbd',
});

export type AKbd = AlpineInstanceFromOptions<typeof AKbd>;
