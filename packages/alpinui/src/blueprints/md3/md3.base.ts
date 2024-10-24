// Types
import type { Blueprint } from '@/types';

export const _md3: Blueprint = {
  defaults: {
    VAppBar: {
      flat: true,
    },
    VAutocomplete: {
      variant: 'filled',
    },
    VBanner: {
      color: 'primary',
    },
    VBottomSheet: {
      contentClass: 'rounded-t-xl overflow-hidden',
    },
    VBtn: {
      color: 'primary',
      rounded: 'xl',
    },
    VBtnGroup: {
      rounded: 'xl',
      VBtn: { rounded: null },
    },
    VCard: {
      rounded: 'lg',
    },
    VCheckbox: {
      color: 'secondary',
      inset: true,
    },
    VChip: {
      rounded: 'sm',
    },
    VCombobox: {
      variant: 'filled',
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VSelect: {
      variant: 'filled',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'filled',
    },
    VTextField: {
      variant: 'filled',
    },
    VToolbar: {
      VBtn: {
        color: null,
      },
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#6750a4',
          secondary: '#b4b0bb',
          tertiary: '#7d5260',
          error: '#b3261e',
          surface: '#fffbfe',
        },
      },
    },
  },
};
