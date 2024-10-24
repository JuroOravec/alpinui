// Components
import { VClassIcon } from '@/components/VIcon/icons';

// Utilities
import { h } from 'vue';

// Types
import type { IconSet } from '@/composables/icons';

export { aliases } from './mdi.base';

export const mdi: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props: any) => h(VClassIcon, { ...props, class: 'mdi' }),
};
