// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VListImgSlots extends RawSlots {
  default: never;
}

export const klass = 'v-list-img';

export const _ListImg = createSimpleFunctionalHeadless(klass);
