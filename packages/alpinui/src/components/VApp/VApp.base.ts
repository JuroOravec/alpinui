// Styles
import './VApp.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { createLayout, makeLayoutProps } from '@/composables/layout';
import { useRtl } from '@/composables/locale';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export interface VAppSlots extends RawSlots {
  default: never;
}

export const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({ fullHeight: true }),
  ...makeThemeProps(),
}, 'VApp');

export const _App = defineComponent({
  name: 'VApp',

  props: makeVAppProps(),

  slots: makeSlots<VAppSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const theme = provideTheme(vm, props);
    const { layoutClasses, getLayoutItem, items, layoutRef } = createLayout(vm, props);
    const { rtlClasses } = useRtl(vm);
    const { classes, styles } = useComponent(vm, props);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      { 'v-application': true },
      theme.themeClasses.value,
      layoutClasses.value,
      rtlClasses.value,
      classes.value,
    ]));

    return {
      expose: {
        getLayoutItem,
        items,
        theme,
      },
      renderInput: {
        layoutRef,
        rootClasses,
        styles,
      },
    };
  },
  renderHeadless: () => null,
});
