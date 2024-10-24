// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Lazy } from './VLazy.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVLazyProps as makeALazyProps,
  VLazySlots as ALazySlots,
} from './VLazy.base';

export const ALazy = defineAlpineComponent({
  ..._Lazy,
  name: 'ALazy',
});

export type ALazy = AlpineInstanceFromOptions<typeof ALazy>;
