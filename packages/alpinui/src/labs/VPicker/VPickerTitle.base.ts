// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VPickerTitleSlots extends RawSlots {
  default: never;
}

export const klass = 'v-picker-title';

export const _PickerTitle = createSimpleFunctionalHeadless(klass);
