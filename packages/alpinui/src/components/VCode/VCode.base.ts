// Styles
import './VCode.sass';

// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VCodeSlots extends RawSlots {
  default: never;
}

export const klass = 'v-code';

export const _Code = createSimpleFunctionalHeadless(klass);
