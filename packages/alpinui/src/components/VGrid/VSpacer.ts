// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _Spacer, klass, name, tag } from './VSpacer.base';
import { defineVueComponent } from '@/engines/vue';

export type { VSpacerSlots } from './VSpacer.base';

export const VSpacer = defineVueComponent({
  ..._Spacer,
  ...createSimpleFunctionalVue(klass, tag, name),
});

export type VSpacer = InstanceType<typeof VSpacer>;
