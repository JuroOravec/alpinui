/* eslint-disable local-rules/sort-imports */

// Styles
import '@/styles/main.sass';

// Icons
import { VClassIcon, VComponentIcon, VSvgIcon } from '@/components/VIcon/icons';
import { mdi } from '@/iconsets/mdi';
import { setIcons } from '@/engines/util/icons';

import * as blueprints from '@/blueprints';
/* eslint-disable-next-line local-rules/no-components-index */
import * as components from '@/components';
import * as directives from '@/directives';
import { createVuetify as _createVuetify } from './framework';

// Types
import type { VuetifyOptions } from './framework';

setIcons({
  icons: {
    class: VClassIcon,
    component: VComponentIcon,
    svg: VSvgIcon,
  },
  fallbackIconset: {
    name: 'mdi',
    iconset: mdi,
  },
});

export const createVuetify = (options: VuetifyOptions = {}) => {
  return _createVuetify({ components, directives, ...options });
};

export const version = __VUETIFY_VERSION__;
createVuetify.version = version;

export {
  blueprints,
  components,
  directives,
};
export * from '@/composables';
