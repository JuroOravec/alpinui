// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Overlay } from './VOverlay.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVOverlayProps as makeAOverlayProps,
  VOverlaySlots as AOverlaySlots,
} from './VOverlay.base';

export const AOverlay = defineAlpineComponent({
  ..._Overlay,
  name: 'AOverlay',
});

export type AOverlay = AlpineInstanceFromOptions<typeof AOverlay>;
