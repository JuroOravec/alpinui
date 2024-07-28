import vuetify from './vuetify';

// import { routes } from './router';
// import viteSSR from 'vite-ssr/vue';

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

document.addEventListener('alpine:init', () => {
  AlpineReactivity.setAlpine(Alpine);
  vuetify.install(Alpine);
});
