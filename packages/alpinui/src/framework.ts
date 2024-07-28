// Utilities
import { createAlpineComposition, defineComponent } from 'alpine-composition';
import * as _components from './components';
import { getUid } from '@/util/getCurrentInstance';

// Types
import type { Data, EmitsOptions, PluginFn } from 'alpine-composition';
import type _Alpine from 'alpinejs';
import type { Magics } from 'alpinejs';

export * from './composables';
export type { DateOptions, DateInstance, DateModule } from '@/composables/date';

export interface CreateAlpinuiOptions {
  aliases?: Record<string, any>;
  components?: Record<string, any>;
  plugins?: PluginFn[];
}

declare module 'alpine-composition' {
  export interface AlpineInstance<T extends Data, P extends Data, E extends EmitsOptions> extends Magics<P> {
    $aliasName?: string;
  }

  export interface ComponentOptions<T extends Data, P extends Data, E extends EmitsOptions> {
    aliasName?: string;
  }
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
  const { aliases = {}, components = _components as any } = options;

  const { registerComponent } = createAlpineComposition({
    plugins: [aliasNamePlugin, ...options?.plugins ?? []],
  });

  // Allow users to provide their own instance of Alpine via install()
  const install = (Alpine: typeof _Alpine) => {
    for (const key in components) {
      registerComponent(Alpine, components[key]);
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
