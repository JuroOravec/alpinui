// Composables
import { createDate, DateAdapterSymbol, DateOptionsSymbol } from '@/composables/date/date';
import { createDefaults, DefaultsSymbol } from '@/composables/defaults';
import { createDisplay, DisplaySymbol } from '@/composables/display';
import { createGoTo, GoToSymbol } from '@/composables/goto';
import { createIcons, IconSymbol } from '@/composables/icons';
import { createLocale, LocaleSymbol } from '@/composables/locale';
import { createTheme, ThemeSymbol } from '@/composables/theme';

// Utilities
import { mergeDeep } from '@/util/helpers';

import { defineComponent } from 'alpine-composition';

// Types
import type { PropType } from 'vue';
import type { DateOptions } from '@/composables/date';
import type { DefaultsOptions } from '@/composables/defaults';
import type { DisplayOptions, SSROptions } from '@/composables/display';
import type { GoToOptions } from '@/composables/goto';
import type { IconOptions } from '@/composables/icons';
import type { LocaleOptions, RtlOptions } from '@/composables/locale';
import type { ThemeOptions } from '@/composables/theme';

export interface AlpinuiOptions {
  blueprint?: Blueprint;
  date?: DateOptions;
  defaults?: DefaultsOptions;
  display?: DisplayOptions;
  goTo?: GoToOptions;
  theme?: ThemeOptions;
  icons?: IconOptions;
  locale?: LocaleOptions & RtlOptions;
  ssr?: SSROptions;
}

export interface Blueprint extends Omit<AlpinuiOptions, 'blueprint'> {}

// TODO - The entrypoint is that, at 'alpine:init' event, we define this Alpineui
// component. And then, when user uses it, user can tweak what components it uses,
// and those will be registered afterwards.
// `document.addEventListener('alpine:init', () => {})`
export const Alpinui = defineComponent({
  /* eslint-disable vue/multi-word-component-names */
  name: 'Alpinui',
  props: {
    options: {
      type: Object as PropType<AlpinuiOptions>,
      default: (): AlpinuiOptions => ({}),
    },
  },
  emits: {
    hello: (data: { a: 1 }) => true,
  },

  // TODO - Convert this to component, so that instead of users defining
  // `createVuetify()`, they declare the top-level component as
  // `<div x-data="alpinui" ></div>`
  setup: (props, vm) => {
    const { blueprint, ...rest } = props.options;
    const options: AlpinuiOptions = mergeDeep(blueprint, rest);

    const defaults = createDefaults(options.defaults);
    const display = createDisplay(options.display, options.ssr);
    const theme = createTheme(options.theme);
    const icons = createIcons(options.icons);
    const locale = createLocale(options.locale);
    const date = createDate(options.date, locale);
    const goTo = createGoTo(options.goTo, locale);

    vm.$provide(DefaultsSymbol, defaults);
    vm.$provide(DisplaySymbol, display);
    vm.$provide(ThemeSymbol, theme);
    vm.$provide(IconSymbol, icons);
    vm.$provide(LocaleSymbol, locale);
    vm.$provide(DateOptionsSymbol, date.options);
    vm.$provide(DateAdapterSymbol, date.instance);
    vm.$provide(GoToSymbol, goTo);

    // TODO - Is this needed?
    // import { IN_BROWSER } from '@/util/globals';
    // if (IN_BROWSER && options.ssr) {
    //   const { mount } = app;
    //   app.mount = (...args) => {
    //     // const vm = mount(...args);
    //     vm.$nextTick(() => display.update());
    //     app.mount = mount;
    //     return vm;
    //   };
    // }

    const hello = 'world';
    const triggerEmit = () => {
      vm.$emit('hello', { a: 1 });
    };

    return {
      defaults,
      display,
      theme,
      icons,
      locale,
      date,
      goTo,
      hello, // TODO
      triggerEmit, // TODO
    };
  },
});
