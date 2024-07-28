/* eslint-disable local-rules/sort-imports */

// Styles
import './styles/main.sass';

// Components
import * as blueprints from './blueprints';
import * as components from './components';
import { createAlpinui as _createAlpinui } from './framework';

// Types
import type { CreateAlpinuiOptions } from './framework';

// TODO
// TODO
// TODO - CHECK IF THESE ARE SET TO GLOBAL_THIS IF IMPORTED VIA CDN
// TODO   -> SHOULD BE SO - WORKS FOR VUETIFY AND VUE
// TODO

export const createAlpinui = (options: CreateAlpinuiOptions = {}) => {
  return _createAlpinui({ components, ...options });
};

export const version = __VUETIFY_VERSION__;
createAlpinui.version = version;

export { blueprints, components };
export * from './composables';

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
