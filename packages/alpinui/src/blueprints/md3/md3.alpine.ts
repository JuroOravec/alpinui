// Icons
import { mdi } from '@/iconsets/mdi/mdi.alpine';

// Types
import { _md3 } from './md3.base';
import type { Blueprint } from '@/types';

export const md3: Blueprint = {
  ..._md3,

  // Alpine-specific config
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
};
