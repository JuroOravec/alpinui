// Styles
import './VGrid.sass';

// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VSpacerSlots extends RawSlots {
  default: never;
}

export const klass = 'v-spacer';
export const tag = 'div';
export const name = 'VSpacer';

export const _Spacer = createSimpleFunctionalHeadless(klass, tag, name);
