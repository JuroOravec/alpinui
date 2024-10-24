// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Dialog } from './VDialog.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVDialogProps as makeADialogProps,
  VDialogSlots as ADialogSlots,
} from './VDialog.base';

export const ADialog = defineAlpineComponent({
  ..._Dialog,
  name: 'ADialog',
});

export type ADialog = AlpineInstanceFromOptions<typeof ADialog>;
