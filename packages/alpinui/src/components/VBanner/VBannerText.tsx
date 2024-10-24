// Composables
import { _BannerText, klass } from './VBannerText.base';
import { createSimpleFunctionalVue } from '@/composables/createSimpleFunctional/createSimpleFunctional.vue';
import { defineVueComponent } from '@/engines/vue';

export type { VBannerTextSlots } from './VBannerText.base';

export const VBannerText = defineVueComponent({
  ..._BannerText,
  ...createSimpleFunctionalVue(klass),
});

export type VBannerText = InstanceType<typeof VBannerText>;
