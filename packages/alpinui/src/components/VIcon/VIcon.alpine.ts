// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Icon } from './VIcon.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVIconProps as makeAIconProps,
  VIconSlots as AIconSlots,
} from './VIcon.base';

export const AIcon = defineAlpineComponent({
  ..._Icon,
  name: 'AIcon',
});

export type AIcon = AlpineInstanceFromOptions<typeof AIcon>;
