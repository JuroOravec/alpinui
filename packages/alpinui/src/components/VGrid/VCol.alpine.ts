// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Col } from './VCol.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVColProps as makeAColProps,
  VColSlots as AColSlots,
} from './VCol.base';

export const ACol = defineAlpineComponent({
  ..._Col,
  name: 'ACol',
});

export type ACol = AlpineInstanceFromOptions<typeof ACol>;
