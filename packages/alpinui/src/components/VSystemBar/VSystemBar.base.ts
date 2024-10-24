// Styles
import './VSystemBar.sass';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { useSsrBoot } from '@/composables/ssrBoot';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVSystemBarProps = propsFactory({
  color: String,
  height: [Number, String],
  window: Boolean,

  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VSystemBar');

export interface VSystemBarSlots extends RawSlots {
  default: never;
}

export const _SystemBar = defineComponent({
  name: 'VSystemBar',

  props: makeVSystemBarProps(),

  slots: makeSlots<VSystemBarSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, shallowRef, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { ssrBootStyles } = useSsrBoot(vm);
    const height = computed(() => props.height ?? (props.window ? 32 : 24));
    const { layoutItemStyles } = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: shallowRef('top'),
      layoutSize: height,
      elementSize: height,
      active: computed(() => true),
      absolute: toRef(props, 'absolute'),
    });

    const rootClasses = computed(() => normalizeClass([
      'v-system-bar',
      { 'v-system-bar--window': props.window },
      themeClasses.value,
      backgroundColorClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      layoutItemStyles.value,
      ssrBootStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
