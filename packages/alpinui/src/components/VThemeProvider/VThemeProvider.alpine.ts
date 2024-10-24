// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ThemeProvider } from './VThemeProvider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVThemeProviderProps as makeAThemeProviderProps,
  VThemeProviderSlots as AThemeProviderSlots,
} from './VThemeProvider.base';

export const AThemeProvider = defineAlpineComponent({
  ..._ThemeProvider,
  name: 'AThemeProvider',
});

export type AThemeProvider = AlpineInstanceFromOptions<typeof AThemeProvider>;
