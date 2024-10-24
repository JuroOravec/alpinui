// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Autocomplete } from './VAutocomplete.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVAutocompleteProps as makeAAutocompleteProps,
  VAutocompleteSlots as AAutocompleteSlots,
} from './VAutocomplete.base';

export const AAutocomplete = defineAlpineComponent({
  ..._Autocomplete,
  name: 'AAutocomplete',
});

export type AAutocomplete = AlpineInstanceFromOptions<typeof AAutocomplete>;
