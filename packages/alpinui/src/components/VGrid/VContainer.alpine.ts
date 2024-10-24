// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Container } from './VContainer.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVContainerProps as makeAContainerProps,
  VContainerSlots as AContainerSlots,
} from './VContainer.base';

export const AContainer = defineAlpineComponent({
  ..._Container,
  name: 'AContainer',
});

export type AContainer = AlpineInstanceFromOptions<typeof AContainer>;
