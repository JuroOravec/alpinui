// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _NoSsr } from './VNoSsr.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  VNoSsrSlots as ANoSsrSlots,
} from './VNoSsr.base';

export const ANoSsr = defineAlpineComponent({
  ..._NoSsr,
  name: 'ANoSsr',
});

export type ANoSsr = AlpineInstanceFromOptions<typeof ANoSsr>;
