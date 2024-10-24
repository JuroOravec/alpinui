// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListGroup } from './VListGroup.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVListGroupProps as makeAListGroupProps,
  VListGroupSlots as AListGroupSlots,
} from './VListGroup.base';

export const AListGroup = defineAlpineComponent({
  ..._ListGroup,
  name: 'AListGroup',
});

export type AListGroup = AlpineInstanceFromOptions<typeof AListGroup>;
