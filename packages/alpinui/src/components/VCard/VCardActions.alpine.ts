// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CardActions } from './VCardActions.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCardActionsProps as makeACardActionsProps,
  VCardActionsSlots as ACardActionsSlots,
} from './VCardActions.base';

export const ACardActions = defineAlpineComponent({
  ..._CardActions,
  name: 'ACardActions',
});

export type ACardActions = AlpineInstanceFromOptions<typeof ACardActions>;
