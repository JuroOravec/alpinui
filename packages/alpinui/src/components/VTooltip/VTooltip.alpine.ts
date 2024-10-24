// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Tooltip } from './VTooltip.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTooltipProps as makeATooltipProps,
  VTooltipSlots as ATooltipSlots,
} from './VTooltip.base';

export const ATooltip = defineAlpineComponent({
  ..._Tooltip,
  name: 'ATooltip',
});

export type ATooltip = AlpineInstanceFromOptions<typeof ATooltip>;
