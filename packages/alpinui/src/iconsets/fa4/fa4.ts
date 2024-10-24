// Components
import { VClassIcon } from '@/components/VIcon/icons';

// Utilities
import { h } from 'vue';

// Types
import type { IconSet } from '@/composables/icons';

export { aliases } from './fa4.base';

export const fa: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VClassIcon, { ...props, class: 'fa' }),
};
