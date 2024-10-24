// Composables
import { createDate, DateAdapterSymbol, DateOptionsSymbol } from '@/composables/date/date';
import { createDefaults, DefaultsSymbol } from '@/composables/defaults';
import { createDisplay, DisplaySymbol } from '@/composables/display';
import { createGoTo, GoToSymbol } from '@/composables/goto';
import { createIcons, IconSymbol } from '@/composables/icons';
import { createLocale, LocaleSymbol } from '@/composables/locale';
import { createTheme, ThemeSymbol } from '@/composables/theme';

// Utilities
import { nextTick, reactive } from 'vue';
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { IN_BROWSER } from '@/util/globals';
import { mergeDeep } from '@/util/helpers';

// Types
import type { App, ComponentPublicInstance, InjectionKey } from 'vue';
import { createVueHeadlessInstance } from '@/engines/vue';
import type { VuetifyOptions } from '@/types';

export { Blueprint, VuetifyOptions } from '@/types';
export * from '@/composables';
export type { DateOptions, DateInstance, DateModule } from '@/composables/date';

export function createVuetify(vuetify: VuetifyOptions = {}) {
  const { blueprint, ...rest } = vuetify;
  const options: VuetifyOptions = mergeDeep(blueprint, rest);
  const {
    aliases = {},
    components = {},
    directives = {},
  } = options;

  const vm = createVueHeadlessInstance(null as any);
  const defaults = createDefaults(vm, options.defaults);
  const display = createDisplay(vm, options.display, options.ssr);
  const theme = createTheme(vm, options.theme);
  const icons = createIcons(vm, options.icons);
  const locale = createLocale(vm, options.locale);
  const date = createDate(vm, options.date, locale);
  const goTo = createGoTo(options.goTo, locale);

  const install = (app: App) => {
    for (const key in directives) {
      app.directive(key, directives[key]);
    }

    for (const key in components) {
      app.component(key, components[key]);
    }

    for (const key in aliases) {
      app.component(key, defineComponent({
        ...aliases[key],
        name: key,
        aliasName: aliases[key].name,
      }));
    }

    theme.install(app);

    app.provide(DefaultsSymbol, defaults);
    app.provide(DisplaySymbol, display);
    app.provide(ThemeSymbol, theme);
    app.provide(IconSymbol, icons);
    app.provide(LocaleSymbol, locale);
    app.provide(DateOptionsSymbol, date.options);
    app.provide(DateAdapterSymbol, date.instance);
    app.provide(GoToSymbol, goTo);

    if (IN_BROWSER && options.ssr) {
      if (app.$nuxt) {
        app.$nuxt.hook('app:suspense:resolve', () => {
          display.update();
        });
      } else {
        const { mount } = app;
        app.mount = (...args) => {
          const vm = mount(...args);
          nextTick(() => display.update());
          app.mount = mount;
          return vm;
        };
      }
    }

    getUid.reset();

    if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
      app.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol),
              date: inject.call(this, DateAdapterSymbol),
            });
          },
        },
      });
    }
  };

  return {
    install,
    defaults,
    display,
    theme,
    icons,
    locale,
    date,
    goTo,
  };
}

export const version = __VUETIFY_VERSION__;
createVuetify.version = version;

// Vue's inject() can only be used in setup
function inject(this: ComponentPublicInstance, key: InjectionKey<any> | string) {
  const vm = this.$;

  const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides;

  if (provides && (key as any) in provides) {
    return provides[(key as string)];
  }
}
