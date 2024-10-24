// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _LocaleProvider } from './VLocaleProvider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVLocaleProviderProps as makeALocaleProviderProps,
  VLocaleProviderSlots as ALocaleProviderSlots,
} from './VLocaleProvider.base';

export const ALocaleProvider = defineAlpineComponent({
  ..._LocaleProvider,
  name: 'ALocaleProvider',
});

export type ALocaleProvider = AlpineInstanceFromOptions<typeof ALocaleProvider>;
