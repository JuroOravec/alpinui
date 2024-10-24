// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _PickerTitle } from './VPickerTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VPickerTitleSlots as APickerTitleSlots } from './VPickerTitle.base';

export const APickerTitle = defineAlpineComponent({
  ..._PickerTitle,
  name: 'APickerTitle',
});

export type APickerTitle = AlpineInstanceFromOptions<typeof APickerTitle>;
