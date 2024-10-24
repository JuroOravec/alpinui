// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ExpansionPanels } from './VExpansionPanels.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVExpansionPanelsProps as makeAExpansionPanelsProps,
  VExpansionPanelSlots as AExpansionPanelSlots,
} from './VExpansionPanels.base';

export const AExpansionPanels = defineAlpineComponent({
  ..._ExpansionPanels,
  name: 'AExpansionPanels',
});

export type AExpansionPanels = AlpineInstanceFromOptions<typeof AExpansionPanels>;
