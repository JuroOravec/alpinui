// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _AlertTitle } from './VAlertTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VAlertSlots as AAlertSlots } from './VAlertTitle.base';

export const AAlertTitle = defineAlpineComponent({
  ..._AlertTitle,
  name: 'AAlertTitle',
});

export type AAlertTitle = AlpineInstanceFromOptions<typeof AAlertTitle>;
