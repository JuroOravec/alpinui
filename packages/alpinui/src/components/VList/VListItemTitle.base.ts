// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VListItemTitleSlots extends RawSlots {
  default: never;
}

export const klass = 'v-list-item-title';

export const _ListItemTitle = createSimpleFunctionalHeadless(klass);
