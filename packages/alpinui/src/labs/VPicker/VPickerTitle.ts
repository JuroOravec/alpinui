// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _PickerTitle, klass } from './VPickerTitle.base';
import { defineVueComponent } from '@/engines/vue';

export type { VPickerTitleSlots } from './VPickerTitle.base';

export const VPickerTitle = defineVueComponent({
  ..._PickerTitle,
  ...createSimpleFunctionalVue(klass),
});

export type VPickerTitle = InstanceType<typeof VPickerTitle>;
