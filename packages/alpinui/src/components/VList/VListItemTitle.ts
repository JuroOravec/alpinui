// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _ListItemTitle, klass } from './VListItemTitle.base';
import { defineVueComponent } from '@/engines/vue';

export type { VListItemTitleSlots } from './VListItemTitle.base';

export const VListItemTitle = defineVueComponent({
  ..._ListItemTitle,
  ...createSimpleFunctionalVue(klass),
});

export type VListItemTitle = InstanceType<typeof VListItemTitle>;
