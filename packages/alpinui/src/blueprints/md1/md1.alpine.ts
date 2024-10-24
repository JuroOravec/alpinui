// Icons
import { mdi } from '@/iconsets/mdi/mdi.alpine';

// Types
import { _md1 } from './md1.base';
import type { Blueprint } from '@/types';

export const md1: Blueprint = {
  ..._md1,

  // Alpine-specific config
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
};
