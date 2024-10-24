// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Label } from './VLabel.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVLabelProps as makeALabelProps,
  VLabelSlots as ALabelSlots,
} from './VLabel.base';

export const ALabel = defineAlpineComponent({
  ..._Label,
  name: 'ALabel',
});

export type ALabel = AlpineInstanceFromOptions<typeof ALabel>;
