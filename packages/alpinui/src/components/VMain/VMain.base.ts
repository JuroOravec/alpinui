// Styles
import './VMain.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { useLayout } from '@/composables/layout';
import { useSsrBoot } from '@/composables/ssrBoot';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVMainProps = propsFactory({
  scrollable: Boolean,

  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({ tag: 'main' }),
}, 'VMain');

export interface VMainSlots extends RawSlots {
  default: never;
}

export const _Main = defineComponent({
  name: 'VMain',

  props: makeVMainProps(),

  slots: makeSlots<VMainSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { mainStyles, layoutIsReady } = useLayout(vm);
    const { ssrBootStyles } = useSsrBoot(vm);

    const rootClasses = computed(() => normalizeClass([
      'v-main',
      { 'v-main--scrollable': props.scrollable },
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      mainStyles.value,
      ssrBootStyles.value,
      dimensionStyles.value,
      styles.value,
    ]));

    return {
      expose: layoutIsReady,
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
