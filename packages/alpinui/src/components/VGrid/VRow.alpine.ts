// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Row } from './VRow.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVRowProps as makeARowProps,
  VRowSlots as ARowSlots,
} from './VRow.base';

export const ARow = defineAlpineComponent({
  ..._Row,
  name: 'ARow',
});

export type ARow = AlpineInstanceFromOptions<typeof ARow>;
