// Styles
import './VLayout.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { createLayout, makeLayoutProps } from '@/composables/layout';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLayoutProps(),
}, 'VLayout');

export interface VLayoutSlots extends RawSlots {
  default: never;
}

export const _Layout = defineComponent({
  name: 'VLayout',

  props: makeVLayoutProps(),

  slots: makeSlots<VLayoutSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(vm, props);
    const { dimensionStyles } = useDimension(vm, props);

    const rootClasses = computed(() => normalizeClass([
      layoutClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      dimensionStyles.value,
      layoutStyles.value,
      styles.value,
    ]));

    return {
      expose: {
        getLayoutItem,
        items,
      },
      renderInput: {
        layoutRef,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
