// Composables
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';

// Utilities
import { _ListImg, klass } from './VListImg.base';
import { defineVueComponent } from '@/engines/vue';

export type { VListImgSlots } from './VListImg.base';

export const VListImg = defineVueComponent({
  ..._ListImg,
  ...createSimpleFunctionalVue(klass),
});

export type VListImg = InstanceType<typeof VListImg>;
