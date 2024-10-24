// Styles
import './VThemeProvider.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVThemeProviderProps = propsFactory({
  withBackground: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeTagProps(),
}, 'VThemeProvider');

export interface VThemeProviderSlots extends RawSlots {
  default: never;
}

export const _ThemeProvider = defineComponent({
  name: 'VThemeProvider',

  props: makeVThemeProviderProps(),

  slots: makeSlots<VThemeProviderSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-theme-provider',
      themeClasses.value,
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
