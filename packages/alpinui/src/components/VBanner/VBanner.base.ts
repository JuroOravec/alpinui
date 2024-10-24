// Styles
import './VBanner.sass';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeDisplayProps, useDisplay } from '@/composables/display';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeLocationProps, useLocation } from '@/composables/location';
import { makePositionProps, usePosition } from '@/composables/position';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';

export type VBannerSlots = {
  default: never;
  prepend: never;
  text: never;
  actions: never;
}

export const makeVBannerProps = propsFactory({
  avatar: String,
  bgColor: String,
  color: String,
  icon: IconValue,
  lines: String as PropType<'one' | 'two' | 'three'>,
  stacked: Boolean,
  sticky: Boolean,
  text: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeDisplayProps({ mobile: null }),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VBanner');

export const _Banner = defineComponent({
  name: 'VBanner',

  props: makeVBannerProps(),

  slots: makeSlots<VBannerSlots>({
    default: null,
    prepend: null,
    text: null,
    actions: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, props, 'bgColor');
    const { borderClasses } = useBorder(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { displayClasses, mobile } = useDisplay(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { locationStyles } = useLocation(vm, props);
    const { positionClasses } = usePosition(vm, props);
    const { roundedClasses } = useRounded(vm, props);

    const { themeClasses } = provideTheme(vm, props);

    const color = toRef(props, 'color');
    const density = toRef(props, 'density');

    provideDefaults(vm, { VBannerActions: { color, density } });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      {
        'v-banner': true,
        'v-banner--stacked': props.stacked || mobile.value,
        'v-banner--sticky': props.sticky,
        [`v-banner--${props.lines}-line`]: !!props.lines,
      },
      themeClasses.value,
      backgroundColorClasses.value,
      borderClasses.value,
      densityClasses.value,
      displayClasses.value,
      elevationClasses.value,
      positionClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      dimensionStyles.value,
      locationStyles.value,
      styles.value,
    ]));

    const prependDefaults = computed(() => ({
      VAvatar: {
        color: color.value,
        density: density.value,
        icon: props.icon,
        image: props.avatar,
      },
    }));

    return {
      expose: {},
      renderInput: {
        color,
        density,
        prependDefaults,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
