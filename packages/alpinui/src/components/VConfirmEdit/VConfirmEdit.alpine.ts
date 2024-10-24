// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ConfirmEdit } from './VConfirmEdit.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVConfirmEditProps as makeAConfirmEditProps,
  VConfirmEditSlots as AConfirmEditSlots,
} from './VConfirmEdit.base';

export const AConfirmEdit = defineAlpineComponent({
  ..._ConfirmEdit,
  name: 'AConfirmEdit',
});

export type AConfirmEdit = AlpineInstanceFromOptions<typeof AConfirmEdit>;
