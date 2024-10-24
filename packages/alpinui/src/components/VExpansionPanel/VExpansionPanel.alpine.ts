// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ExpansionPanel } from './VExpansionPanel.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVExpansionPanelProps as makeAExpansionPanelProps,
  VExpansionPanelSlots as AExpansionPanelSlots,
} from './VExpansionPanel.base';

export const AExpansionPanel = defineAlpineComponent({
  ..._ExpansionPanel,
  name: 'AExpansionPanel',
});

export type AExpansionPanel = AlpineInstanceFromOptions<typeof AExpansionPanel>;
