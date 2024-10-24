/* eslint-disable complexity */

// Styles
import './VCard.sass';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeLoaderProps, useLoader } from '@/composables/loader';
import { makeLocationProps, useLocation } from '@/composables/location';
import { makePositionProps, usePosition } from '@/composables/position';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeRouterProps, useRouterLink } from '@/composables/router';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps, useVariant } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VCardItemSlots } from './VCardItem.base';
import { IconValue } from '../VIcon/icons.base';
import type { LoaderSlotProps } from '@/components/VLoaderSlot/VLoaderSlot.base';
import type { RippleValue } from '@/directives/ripple';

export const makeVCardProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: undefined,
  },
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'elevated' } as const),
}, 'VCard');

export type VCardSlots = VCardItemSlots & {
  default: never;
  actions: never;
  text: never;
  loader: LoaderSlotProps;
  image: never;
  item: never;
}

export const _Card = defineComponent({
  name: 'VCard',

  props: makeVCardProps(),

  slots: makeSlots<VCardSlots>({
    default: null,
    actions: null,
    text: null,
    loader: null,
    image: null,
    item: null,
    prepend: null,
    append: null,
    title: null,
    subtitle: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { borderClasses } = useBorder(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { loaderClasses } = useLoader(vm, props);
    const { locationStyles } = useLocation(vm, props);
    const { positionClasses } = usePosition(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const link = useRouterLink(vm, props, vm.attrs);

    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      !!(props.link || link.isClickable.value)
    );

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      {
        'v-card': true,
        'v-card--disabled': props.disabled,
        'v-card--flat': props.flat,
        'v-card--hover': props.hover && !(props.disabled || props.flat),
        'v-card--link': isClickable.value,
      },
      themeClasses.value,
      borderClasses.value,
      colorClasses.value,
      densityClasses.value,
      elevationClasses.value,
      loaderClasses.value,
      positionClasses.value,
      roundedClasses.value,
      variantClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      colorStyles.value,
      dimensionStyles.value,
      locationStyles.value,
      styles.value,
    ]));

    const imageDefaults = computed(() => ({
      VImg: {
        cover: true,
        src: props.image,
      },
    }));

    const loaderColor = computed(() => typeof props.loading === 'boolean' ? undefined : props.loading);

    return {
      expose: {},
      renderInput: {
        isClickable,
        isLink,
        link,
        loaderColor,
        rootClasses,
        rootStyles,
        imageDefaults,
      },
    };
  },
  renderHeadless: () => null,
});
