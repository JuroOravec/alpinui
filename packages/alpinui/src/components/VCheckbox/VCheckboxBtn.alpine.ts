// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CheckboxBtn } from './VCheckboxBtn.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVCheckboxBtnProps as makeACheckboxBtnProps,
  VCheckboxBtnSlots as ACheckboxBtnSlots,
} from './VCheckboxBtn.base';

export const ACheckboxBtn = defineAlpineComponent({
  ..._CheckboxBtn,
  name: 'ACheckboxBtn',
});

export type ACheckboxBtn = AlpineInstanceFromOptions<typeof ACheckboxBtn>;
