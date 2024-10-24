// Components
import { VLigatureIcon } from '@/components/VIcon/icons';

// Utilities
import { h } from 'vue';

// Types
import type { IconSet } from '@/composables/icons';

export { aliases } from './md.base';

export const md: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VLigatureIcon, { ...props, class: 'material-icons' }),
};
