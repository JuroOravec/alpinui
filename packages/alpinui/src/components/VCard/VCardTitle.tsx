// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _CardTitle, klass } from './VCardTitle.base';
import { defineVueComponent } from '@/engines/vue';

export type { VCardTitleSlots } from './VCardTitle.base';

export const VCardTitle = defineVueComponent({
  ..._CardTitle,
  ...createSimpleFunctionalVue(klass),
});

export type VCardTitle = InstanceType<typeof VCardTitle>;
