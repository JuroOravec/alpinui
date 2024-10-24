// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Spacer } from './VSpacer.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VSpacerSlots as ASpacerSlots } from './VSpacer.base';

export const ASpacer = defineAlpineComponent({
  ..._Spacer,
  name: 'ASpacer',
});

export type ASpacer = AlpineInstanceFromOptions<typeof ASpacer>;
