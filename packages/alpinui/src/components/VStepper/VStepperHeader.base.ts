// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VStepperHeaderSlots extends RawSlots {
  default: never;
}

export const klass = 'v-stepper-header';

export const _StepperHeader = createSimpleFunctionalHeadless(klass);
