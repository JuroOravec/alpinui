// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Snackbar } from './VSnackbar.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSnackbarProps as makeASnackbarProps,
  VSnackbarSlots as ASnackbarSlots,
} from './VSnackbar.base';

export const ASnackbar = defineAlpineComponent({
  ..._Snackbar,
  name: 'ASnackbar',
});

export type ASnackbar = AlpineInstanceFromOptions<typeof ASnackbar>;
