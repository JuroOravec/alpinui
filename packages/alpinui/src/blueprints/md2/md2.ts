// Icons
import { mdi } from '@/iconsets/mdi';

// Types
import { _md2 } from './md2.base';
import type { Blueprint } from '@/types';

export const md2: Blueprint = {
  ..._md2,

  // Vuetify-specific config
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
};
