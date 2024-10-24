// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _StepperHeader, klass } from './VStepperHeader.base';
import { defineVueComponent } from '@/engines/vue';

export type { VStepperHeaderSlots } from './VStepperHeader.base';

export const VStepperHeader = defineVueComponent({
  ..._StepperHeader,
  ...createSimpleFunctionalVue(klass),
});

export type VStepperHeader = InstanceType<typeof VStepperHeader>;
