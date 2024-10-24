// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _CardTitle } from './VCardTitle.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VCardTitleSlots as ACardTitleSlots } from './VCardTitle.base';

export const ACardTitle = defineAlpineComponent({
  ..._CardTitle,
  name: 'ACardTitle',
});

export type ACardTitle = AlpineInstanceFromOptions<typeof ACardTitle>;
