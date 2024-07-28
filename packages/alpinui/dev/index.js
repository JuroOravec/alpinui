import vuetify from './vuetify';
import App from './App.vue';

import { routes } from './router';
import viteSSR from 'vite-ssr/vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

debugger;
document.addEventListener('alpine:init', () => {
  debugger;
  AlpineReactivity.setAlpine(Alpine);
  vuetify.install(Alpine);
});

// export default viteSSR(App, { routes }, ({ app }) => {
// app.use(vuetify);
// app.component('FontAwesomeIcon', FontAwesomeIcon);
// });
