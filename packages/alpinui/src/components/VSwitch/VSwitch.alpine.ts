// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Switch } from './VSwitch.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSwitchProps as makeASwitchProps,
  VSwitchSlots as ASwitchSlots,
} from './VSwitch.base';

export const ASwitch = defineAlpineComponent({
  ..._Switch,
  name: 'ASwitch',
});

export type ASwitch = AlpineInstanceFromOptions<typeof ASwitch>;
