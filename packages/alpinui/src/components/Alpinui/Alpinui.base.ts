// Composables
import { createDate, DateAdapterSymbol, DateOptionsSymbol } from '@/composables/date/date';
import { createDefaults, DefaultsSymbol } from '@/composables/defaults';
import { createDisplay, DisplaySymbol } from '@/composables/display';
import { createGoTo, GoToSymbol } from '@/composables/goto';
import { createIcons, IconSymbol } from '@/composables/icons';
import { createLocale, LocaleSymbol } from '@/composables/locale';
import { createTheme, ThemeSymbol } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { mergeDeep } from '@/util/helpers';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RawSlots } from '@/engines/types';
import type { VuetifyOptions } from '@/types';

export type AlpinuiOptions = Omit<VuetifyOptions, 'aliases' | 'components' | 'directives'>;

export interface AlpinuiSlots extends RawSlots {
  default: never;
}

// NOTE(Alpinui) - Unlike Vuetify `createVuetify()`, in Alpine this is instead
// a top-level component:
// `<div x-data="Alpinui" ></div>`
//
// NOTE(Alpinui): The entrypoint is that, at 'alpine:init' event, we define this Alpineui
// component. And then, when user uses it, user can tweak what components it uses,
// and those will be registered afterwards.
// `document.addEventListener('alpine:init', () => {})`
export const _Alpinui = defineComponent({
  /* eslint-disable-next-line vue/multi-word-component-names */
  name: 'Alpinui',

  // NOTE(Alpinui): MUST be false. If true, injects defaults. But this component
  // cannot inject, as it's the one that provides the values.
  exposeDefaults: false,

  props: {
    options: {
      type: Object as PropType<AlpinuiOptions>,
      default: (): AlpinuiOptions => ({}),
    },
  },
  emits: {
    hello: (data: { a: 1 }) => true,
  },

  slots: makeSlots<AlpinuiSlots>({
    default: null,
  }),

  setupHeadless: (props, vm) => {
    const { computed, watchEffect, provide, toRefs } = vm.reactivity;

    const { options: givenOptions } = toRefs(props);

    const options = computed(() => {
      const { blueprint, ...rest } = givenOptions.value;
      return mergeDeep(blueprint, rest) as AlpinuiOptions;
    });

    const defaults = computed(() => createDefaults(vm, options.value.defaults));
    const display = computed(() => createDisplay(vm, options.value.display, options.value.ssr));
    const theme = computed(() => createTheme(vm, options.value.theme));
    const icons = computed(() => createIcons(vm, options.value.icons));
    const locale = computed(() => createLocale(vm, options.value.locale));
    const date = computed(() => createDate(vm, options.value.date, locale.value));
    const goTo = computed(() => createGoTo(options.value.goTo, locale.value));

    // @ts-expect-error
    const head = globalThis.unhead.createHead();
    theme.value.installHead(head);

    watchEffect(() => {
      provide(DefaultsSymbol, defaults.value);
      provide(DisplaySymbol, display.value);
      provide(ThemeSymbol, theme.value);
      provide(IconSymbol, icons.value);
      provide(LocaleSymbol, locale.value);
      provide(DateOptionsSymbol, date.value.options);
      provide(DateAdapterSymbol, date.value.instance);
      provide(GoToSymbol, goTo.value);
    });

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

    // TODO
    const hello = 'world';
    const triggerEmit = () => {
      vm.emit('hello', { a: 1 });
    };

    return {
      expose: {
        defaults,
        display,
        theme,
        icons,
        locale,
        date,
        goTo,
        hello, // TODO
        triggerEmit, // TODO
      },
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});
