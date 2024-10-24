// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _App } from './VApp.base';
import { defineAlpineComponent } from '@/engines/alpine';

export { makeVAppProps as makeAAppProps } from './VApp.base';

export const AApp = defineAlpineComponent({
  ..._App,
  name: 'AApp',
});

export type AApp = AlpineInstanceFromOptions<typeof AApp>;
