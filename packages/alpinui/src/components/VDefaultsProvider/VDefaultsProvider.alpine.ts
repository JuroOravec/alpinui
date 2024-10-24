// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _DefaultsProvider } from './VDefaultsProvider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export { makeVDefaultsProviderProps as makeADefaultsProviderProps } from './VDefaultsProvider.base';

export const ADefaultsProvider = defineAlpineComponent({
  ..._DefaultsProvider,
  name: 'ADefaultsProvider',
});

export type ADefaultsProvider = AlpineInstanceFromOptions<typeof ADefaultsProvider>;
