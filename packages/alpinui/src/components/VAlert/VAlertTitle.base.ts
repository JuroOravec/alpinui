// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VAlertSlots extends RawSlots {
  default: never;
}

export const klass = 'v-alert-title';

export const _AlertTitle = createSimpleFunctionalHeadless(klass);
