// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ExpansionPanelText } from './VExpansionPanelText.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVExpansionPanelTextProps as makeAExpansionPanelTextProps,
  VExpansionPanelTextSlots as AExpansionPanelTextSlots,
} from './VExpansionPanelText.base';

export const AExpansionPanelText = defineAlpineComponent({
  ..._ExpansionPanelText,
  name: 'AExpansionPanelText',
});

export type AExpansionPanelText = AlpineInstanceFromOptions<typeof AExpansionPanelText>;
