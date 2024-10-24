// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Alert } from './VAlert.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVAlertProps as makeAAlertProps,
  VAlertSlots as AAlertSlots,
} from './VAlert.base';

export const AAlert = defineAlpineComponent({
  ..._Alert,
  name: 'AAlert',
});

export type AAlert = AlpineInstanceFromOptions<typeof AAlert>;
