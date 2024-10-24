// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ClassIcon, _ComponentIcon, _LigatureIcon, _SvgIcon } from './icons.base';
import { defineAlpineComponent } from '@/engines/alpine';

export { makeIconProps, IconSlots, IconValue } from './icons.base';

export const AComponentIcon = defineAlpineComponent({
  ..._ComponentIcon,
  name: 'AComponentIcon',
});

export type AComponentIcon = AlpineInstanceFromOptions<typeof AComponentIcon>;

export const ASvgIcon = defineAlpineComponent({
  ..._SvgIcon,
  name: 'ASvgIcon',
});

export type ASvgIcon = AlpineInstanceFromOptions<typeof ASvgIcon>;

export const ALigatureIcon = defineAlpineComponent({
  ..._LigatureIcon,
  name: 'ALigatureIcon',
});

export type ALigatureIcon = AlpineInstanceFromOptions<typeof ALigatureIcon>;

export const AClassIcon = defineAlpineComponent({
  ..._ClassIcon,
  name: 'AClassIcon',
});

export type AClassIcon = AlpineInstanceFromOptions<typeof AClassIcon>;
