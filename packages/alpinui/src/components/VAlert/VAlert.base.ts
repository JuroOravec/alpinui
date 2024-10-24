// Styles
import './VAlert.sass';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { useLocale } from '@/composables/locale';
import { makeLocationProps, useLocation } from '@/composables/location';
import { makePositionProps, usePosition } from '@/composables/position';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
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
import { IconValue } from '../VIcon/icons.base';

const allowedTypes = ['success', 'info', 'warning', 'error'] as const;

type ContextualType = typeof allowedTypes[number]

export const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String] as PropType<boolean | 'top' | 'end' | 'bottom' | 'start'>,
    validator: (val: boolean | string) => {
      return typeof val === 'boolean' || [
        'top',
        'end',
        'bottom',
        'start',
      ].includes(val);
    },
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: '$close',
  },
  closeLabel: {
    type: String,
    default: '$vuetify.close',
  },
  icon: {
    type: [Boolean, String, Function, Object] as PropType<false | IconValue>,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: true,
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String as PropType<ContextualType>,
    validator: (val: ContextualType) => allowedTypes.includes(val),
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VAlert');

export type VAlertSlots = {
  default: never;
  prepend: never;
  title: never;
  text: never;
  append: never;
  close: { props: Record<string, any> };
}

export const _Alert = defineComponent({
  name: 'VAlert',

  props: makeVAlertProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VAlertSlots>({
    default: null,
    prepend: null,
    title: null,
    text: null,
    append: null,
    close: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, toRefs } = vm.reactivity;

    const { borderColor = ref() } = toRefs(props);

    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');
    const icon = computed(() => {
      if (props.icon === false) return undefined;
      if (!props.type) return props.icon;

      return props.icon ?? `$${props.type}`;
    });
    const variantProps = computed(() => ({
      color: props.color ?? props.type,
      variant: props.variant,
    }));

    const { themeClasses } = provideTheme(vm, props);
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, variantProps);
    const { densityClasses } = useDensity(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { locationStyles } = useLocation(vm, props);
    const { positionClasses } = usePosition(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, borderColor);
    const { t } = useLocale(vm);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const closeDefaults = computed(() => ({
      VBtn: {
        icon: props.closeIcon,
        size: 'x-small',
        variant: 'text',
      },
    }));

    const closeProps = computed(() => ({
      'aria-label': t(props.closeLabel),
      onClick(e: MouseEvent) {
        isActive.value = false;

        vm.emit('click:close', e);
      },
    }));

    const rootClasses = computed(() => normalizeClass([
      {
        'v-alert': true,
        'v-alert--border': !!props.border,
        [`v-alert--border-${props.border === true ? 'start' : props.border}`]: !!props.border,
        'v-alert--prominent': props.prominent,
      },
      themeClasses.value,
      colorClasses.value,
      densityClasses.value,
      elevationClasses.value,
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

    const borderClasses = computed(() => normalizeClass([
      { 'v-alert__border': true },
      textColorClasses.value,
    ]));

    const iconSize = computed(() => props.prominent ? 44 : 28);

    const prependDefaults = computed(() => ({
      VIcon: {
        density: props.density,
        icon: icon.value,
        size: iconSize.value,
      },
    }));

    return {
      expose: {},
      renderInput: {
        borderClasses,
        closeDefaults,
        closeProps,
        icon,
        iconSize,
        isActive,
        prependDefaults,
        rootClasses,
        rootStyles,
        textColorStyles,
      },
    };
  },
  renderHeadless: () => null,
});
