// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _Code, klass } from './VCode.base';
import { defineVueComponent } from '@/engines/vue';

export type { VCodeSlots } from './VCode.base';

export const VCode = defineVueComponent({
  ..._Code,
  ...createSimpleFunctionalVue(klass),
});

export type VCode = InstanceType<typeof VCode>;
