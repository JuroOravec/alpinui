// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _Kbd, klass } from './VKbd.base';
import { defineVueComponent } from '@/engines/vue';

export type { VKbdSlots } from './VKbd.base';

export const VKbd = defineVueComponent({
  ..._Kbd,
  ...createSimpleFunctionalVue(klass),
});

export type VKbd = InstanceType<typeof VKbd>;
