// Utilities
import { createAlpineComposition, defineComponent } from 'alpine-composition';
import * as _components from './components';
import * as _directives from './directives';
import { getUid } from '@/util/getCurrentInstance';

// Types
import type { ComponentOptions, Data, EmitsOptions, PluginFn } from 'alpine-composition';
import type _Alpine from 'alpinejs';
import type { DirectiveCallback } from 'alpinejs';

export * as components from './components';
export * as directives from './directives';
export * from './composables';
export type { DateOptions, DateInstance, DateModule } from '@/composables/date';

export interface CreateAlpinuiOptions {
  aliases?: Record<string, ComponentOptions<any, any, EmitsOptions>>;
  components?: Record<string, ComponentOptions<any, any, EmitsOptions>>;
  directives?: Record<string, DirectiveCallback>;
  plugins?: PluginFn[];
}

// Alpinui adds `$aliasName` to the Alpine components
const aliasNamePlugin: PluginFn<Data, Data> = (vm, { options }) => {
  const { aliasName } = options;

  Object.defineProperty(vm, '$aliasName', {
    get() {
      return aliasName;
    },
  });
};

/** Register Alpinui components with Alpine */
export function createAlpinui(options: CreateAlpinuiOptions = {}) {
  const {
    aliases = {},
    components = _components,
    directives = _directives,
  } = options;

  const { registerComponent } = createAlpineComposition({
    plugins: [aliasNamePlugin, ...options?.plugins ?? []],
  });

  // Allow users to provide their own instance of Alpine via install()
  const install = (Alpine: typeof _Alpine) => {
    for (const key in directives) {
      Alpine.directive(key, directives[key as keyof typeof directives]);
    }

    for (const key in components) {
      const component: ComponentOptions = (components as any)[key];
      registerComponent(Alpine, component);
    }

    for (const key in aliases) {
      const aliasComp = defineComponent({
        ...aliases[key],
        name: key,
        aliasName: aliases[key].name,
      });
      registerComponent(Alpine, aliasComp);
    }

    getUid.reset();
  };

  return {
    install,
    registerComponent,
  };
}

export const version = __VUETIFY_VERSION__;
createAlpinui.version = version;
