// Styles
import './VKbd.sass';

// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VKbdSlots extends RawSlots {
  default: never;
}

export const klass = 'v-kbd';

export const _Kbd = createSimpleFunctionalHeadless(klass);
