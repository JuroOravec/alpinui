// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ExpansionPanelTitle } from './VExpansionPanelTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVExpansionPanelTitleProps as makeAExpansionPanelTitleProps,
  VExpansionPanelTitleSlots as AExpansionPanelTitleSlots,
  ExpansionPanelTitleSlot,
} from './VExpansionPanelTitle.base';

export const AExpansionPanelTitle = defineAlpineComponent({
  ..._ExpansionPanelTitle,
  name: 'AExpansionPanelTitle',
});

export type AExpansionPanelTitle = AlpineInstanceFromOptions<typeof AExpansionPanelTitle>;
