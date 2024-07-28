/* eslint-disable local-rules/sort-imports */

// Styles
import './styles/main.sass';

// Components
import * as blueprints from './blueprints';
import * as components from './components';
import { createAlpinui as _createAlpinui } from './framework';

// Types
import type { CreateAlpinuiOptions } from './framework';

export const createAlpinui = (options: CreateAlpinuiOptions = {}) => {
  return _createAlpinui({ components, ...options });
};

export const version = __VUETIFY_VERSION__;
createAlpinui.version = version;

export { blueprints, components };
export * from './composables';
