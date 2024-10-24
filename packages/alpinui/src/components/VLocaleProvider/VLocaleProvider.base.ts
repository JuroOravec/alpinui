// Styles
import './VLocaleProvider.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideLocale } from '@/composables/locale';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVLocaleProviderProps = propsFactory({
  locale: String,
  fallbackLocale: String,
  messages: Object,
  rtl: {
    type: Boolean,
    default: undefined,
  },

  ...makeComponentProps(),
}, 'VLocaleProvider');

export interface VLocaleProviderSlots extends RawSlots {
  default: never;
}

export const _LocaleProvider = defineComponent({
  name: 'VLocaleProvider',

  props: makeVLocaleProviderProps(),

  slots: makeSlots<VLocaleProviderSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { rtlClasses } = provideLocale(vm, props);

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-locale-provider',
      rtlClasses.value,
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
