// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Footer } from './VFooter.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVFooterProps as makeAFooterProps,
  VFooterSlots as AFooterSlots,
} from './VFooter.base';

export const AFooter = defineAlpineComponent({
  ..._Footer,
  name: 'AFooter',
});

export type AFooter = AlpineInstanceFromOptions<typeof AFooter>;
