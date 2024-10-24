// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Code } from './VCode.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VCodeSlots as ACodeSlots } from './VCode.base';

export const ACode = defineAlpineComponent({
  ..._Code,
  name: 'ACode',
});

export type ACode = AlpineInstanceFromOptions<typeof ACode>;
