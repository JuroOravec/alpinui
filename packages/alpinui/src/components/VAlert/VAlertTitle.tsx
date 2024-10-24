// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Types
import { _AlertTitle, klass } from './VAlertTitle.base';
import { defineVueComponent } from '@/engines/vue';

export type { VAlertSlots } from './VAlertTitle.base';

export const VAlertTitle = defineVueComponent({
  ..._AlertTitle,
  ...createSimpleFunctionalVue(klass),
});

export type VAlertTitle = InstanceType<typeof VAlertTitle>;
