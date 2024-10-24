// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SpeedDial } from './VSpeedDial.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSpeedDialProps as makeASpeedDialProps,
  VSpeedDialSlots as ASpeedDialSlots,
} from './VSpeedDial.base';

export const ASpeedDial = defineAlpineComponent({
  ..._SpeedDial,
  name: 'ASpeedDial',
});

export type ASpeedDial = AlpineInstanceFromOptions<typeof ASpeedDial>;
