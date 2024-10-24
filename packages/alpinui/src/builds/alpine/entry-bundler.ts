/* eslint-disable local-rules/sort-imports */

// Styles
import '@/styles/main.sass';

// Icons
import { AClassIcon, AComponentIcon, ASvgIcon } from '@/components/VIcon/icons.alpine';
import { mdi } from '@/iconsets/mdi/mdi.alpine';
import { setIcons } from '@/engines/util/icons';

// Components
import * as blueprints from './blueprints';
import * as components from './components';
import * as directives from './directives';
import { createAlpinui as _createAlpinui } from './framework';

// Types
import type { CreateAlpinuiOptions } from './framework';

export const createAlpinui = (options: CreateAlpinuiOptions = {}) => {
  return _createAlpinui({ components, directives, ...options });
};

export const version = __VUETIFY_VERSION__;
createAlpinui.version = version;

export { blueprints, components, directives };
export * from './composables';

setIcons({
  // NOTE: In Alpine we return the name of the components to be passed to `x-data`,
  // e.g. `x-data="ASvgIcon"` or `x-data="AMdiIcon"`
  icons: {
    class: AClassIcon.name,
    component: AComponentIcon.name,
    svg: ASvgIcon.name,
  },
  fallbackIconset: {
    name: 'mdi',
    iconset: mdi,
  },
});

// TODO
// TODO
// TODO - DOCUMENT USAGE
// TODO
// TODO

//
// ```sh
// npm install alpinui
// ```
//
// ```ts
// import Alpine from 'alpinejs'
// import { createAlpinui } from 'alpinui';
//
// createAlpinui({
//   components,
//   aliases,
// }).install(Alpine)
//
// window.Alpine = Alpine
// window.Alpine.start()
// ```

// AND IF USING CDN:
//
// ```html
// <script defer src="https://cdn.jsdelivr.net/npm/alpinui@0.x.x/dist/alpinui.min.js"></script>
// <script defer src="https://cdn.jsdelivr.net/npm/alpinui@0.x.x/dist/alpinui.min.css"></script>
// ```
//
// ```ts
// const { createAlpinui } = Alpinui;
//
// document.addEventListener('alpine:init', () => {
//   createAlpinui({
//     // components,
//     // aliases,
//   }).install(window.Alpine)
// });
// ```
