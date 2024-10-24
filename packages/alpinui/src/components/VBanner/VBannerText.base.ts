// Composables
import { createSimpleFunctionalHeadless } from '@/composables/createSimpleFunctional/createSimpleFunctional';

// Types
import type { RawSlots } from '@/engines/types';

export interface VBannerTextSlots extends RawSlots {
  default: never;
}

export const klass = 'v-banner-text';

export const _BannerText = createSimpleFunctionalHeadless('v-banner-text');
