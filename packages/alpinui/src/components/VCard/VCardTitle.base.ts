// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VCardTitleSlots extends RawSlots {
  default: never;
}

export const klass = 'v-card-title';

export const _CardTitle = createSimpleFunctionalHeadless(klass);
