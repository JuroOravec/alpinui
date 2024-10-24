// Styles
import './VResponsive.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { HeadlessInstance } from '@/engines/types';

export type VResponsiveSlots = {
  default: never;
  additional: never;
}

export function useAspectStyles(vm: HeadlessInstance, props: { aspectRatio?: string | number }) {
  const { computed } = vm.reactivity;

  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);

      return ratio
        ? { paddingBottom: String(1 / ratio * 100) + '%' }
        : undefined;
    }),
  };
}

export const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,

  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VResponsive');

export const _Responsive = defineComponent({
  name: 'VResponsive',

  props: makeVResponsiveProps(),

  slots: makeSlots<VResponsiveSlots>({
    default: null,
    additional: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { aspectStyles } = useAspectStyles(vm, props);
    const { dimensionStyles } = useDimension(vm, props);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-responsive',
      { 'v-responsive--inline': props.inline },
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      dimensionStyles.value,
      styles.value,
    ]));

    const contentClasses = computed(() => normalizeClass([
      'v-responsive__content',
      props.contentClass,
    ]));

    return {
      expose: {},
      renderInput: {
        aspectStyles,
        contentClasses,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
