// Styles
import './VFooter.sass';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';
import { useResizeObserver } from '@/composables/resizeObserver';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 'auto',
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'footer' }),
  ...makeThemeProps(),
}, 'VFooter');

export interface VFooterSlots extends RawSlots {
  default: never;
}

export const _Footer = defineComponent({
  name: 'VFooter',

  props: makeVFooterProps(),

  slots: makeSlots<VFooterSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, shallowRef, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { borderClasses } = useBorder(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);

    const autoHeight = shallowRef(32);
    const { resizeRef } = useResizeObserver(vm, (entries) => {
      if (!entries.length) return;
      autoHeight.value = entries[0].target.clientHeight;
    });
    const height = computed(() => props.height === 'auto' ? autoHeight.value : parseInt(props.height, 10));
    const { layoutItemStyles, layoutIsReady } = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => 'bottom'),
      layoutSize: height,
      elementSize: computed(() => props.height === 'auto' ? undefined : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, 'absolute'),
    });

    const rootClasses = computed(() => normalizeClass([
      'v-footer',
      themeClasses.value,
      backgroundColorClasses.value,
      borderClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height),
      },
      styles.value,
    ]));

    return {
      expose: props.app ? layoutIsReady : {},
      renderInput: {
        resizeRef,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
