// Styles
import './VBtn.sass';

// Components
import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle.base';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeGroupItemProps, useGroupItem } from '@/composables/group';
import { makeLoaderProps, useLoader } from '@/composables/loader';
import { makeLocationProps, useLocation } from '@/composables/location';
import { makePositionProps, usePosition } from '@/composables/position';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeRouterProps, useRouterLink } from '@/composables/router';
import { useSelectLink } from '@/composables/selectLink';
import { makeSizeProps, useSize } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps, useVariant } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { ClassValue } from '@/composables/component';
import type { RippleValue } from '@/directives/ripple';
import type { Slots } from '@/engines/types';

export type VBtnSlots = {
  default: never;
  prepend: never;
  append: never;
  loader: never;
}

export const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined,
  },
  baseColor: String,
  symbol: {
    type: null,
    default: VBtnToggleSymbol,
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object] as PropType<boolean | IconValue>,
  prependIcon: IconValue,
  appendIcon: IconValue,

  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,

  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },

  text: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'button' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'elevated' } as const),
}, 'VBtn');

export const _Btn = defineComponent({
  name: 'VBtn',

  props: makeVBtnProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  // TODO
  slots: {
    default: () => {},
    // prepend: () => {},
    append: () => {},
    loader: () => {},
  } as Required<Slots<VBtnSlots>>,

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { borderClasses } = useBorder(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { loaderClasses } = useLoader(vm, props);
    const { locationStyles } = useLocation(vm, props);
    const { positionClasses } = usePosition(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { sizeClasses, sizeStyles } = useSize(vm, props);
    const group = useGroupItem(vm, props, props.symbol, false);
    const link = useRouterLink(vm, props, vm.attrs);

    const isActive = computed(() => {
      if (props.active !== undefined) {
        return props.active;
      }

      if (link.isLink.value) {
        return link.isActive?.value;
      }

      return group?.isSelected.value;
    });

    const variantProps = computed(() => {
      const showColor = (
        (group?.isSelected.value && (!link.isLink.value || link.isActive?.value)) ||
        (!group || link.isActive?.value)
      );
      return ({
        color: showColor ? props.color ?? props.baseColor : props.baseColor,
        variant: props.variant,
      });
    });
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, variantProps);

    const isDisabled = computed(() => group?.disabled.value || props.disabled);
    const isElevated = computed(() => {
      return props.variant === 'elevated' && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === undefined || typeof props.value === 'symbol') return undefined;

      return Object(props.value) === props.value
        ? JSON.stringify(props.value, null, 0)
        : props.value;
    });

    function onClick(e: MouseEvent) {
      if (
        isDisabled.value ||
        (link.isLink.value && (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          (e.button !== 0) ||
          vm.attrs.target === '_blank'
        ))
      ) return;

      link.navigate?.(e);
      group?.toggle();
    }

    useSelectLink(vm, link, group?.select);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-btn',
      group?.selectedClass.value as ClassValue,
      {
        'v-btn--active': !!isActive.value,
        'v-btn--block': props.block,
        'v-btn--disabled': isDisabled.value,
        'v-btn--elevated': isElevated.value,
        'v-btn--flat': props.flat,
        'v-btn--icon': !!props.icon,
        'v-btn--loading': !!props.loading,
        'v-btn--readonly': props.readonly,
        'v-btn--slim': props.slim,
        'v-btn--stacked': props.stacked,
      },
      themeClasses.value,
      borderClasses.value,
      colorClasses.value,
      densityClasses.value,
      elevationClasses.value,
      loaderClasses.value,
      positionClasses.value,
      roundedClasses.value,
      sizeClasses.value,
      variantClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      colorStyles.value,
      dimensionStyles.value,
      locationStyles.value,
      sizeStyles.value,
      styles.value,
    ]));

    const rootTabindex = computed(() => props.loading || props.readonly ? -1 : undefined);

    const prependDefaults = computed(() => ({
      VIcon: {
        icon: props.prependIcon,
      },
    }));
    const contentDefaults = computed(() => ({
      VIcon: {
        icon: props.icon,
      },
    }));
    const appendDefaults = computed(() => ({
      VIcon: {
        icon: props.appendIcon,
      },
    }));

    const progressColor = computed(() => typeof props.loading === 'boolean' ? undefined : props.loading);

    return {
      expose: { group },
      renderInput: {
        appendDefaults,
        contentDefaults,
        isDisabled,
        link,
        onClick,
        prependDefaults,
        progressColor,
        rootClasses,
        rootStyles,
        rootTabindex,
        valueAttr,
      },
    };
  },
  renderHeadless: () => null,
});
