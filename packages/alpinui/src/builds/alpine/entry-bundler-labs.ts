/* eslint-disable local-rules/sort-imports */

// Components
import * as components from './componentsAll';
import * as directives from './directives';

// Types
import type { CreateAlpinuiOptions } from './framework';
import { createAlpinui as _createAlpinui } from './framework';
import { version } from './entry-bundler';

export * from './entry-bundler';
export { components };

export const createAlpinui = (options: CreateAlpinuiOptions = {}) => {
  return _createAlpinui({ components, directives, ...options });
};

createAlpinui.version = version;
