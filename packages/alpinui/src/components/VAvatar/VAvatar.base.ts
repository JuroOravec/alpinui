// Styles
import './VAvatar.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeSizeProps, useSize } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps, useVariant } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { IconValue } from '../VIcon/icons.base';
import type { RawSlots } from '@/engines/types';
import type { NormalizedStyle } from '@/util/helpers';

export const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VAvatar');

export interface VAvatarSlots extends RawSlots {
  default: never;
}

export const _Avatar = defineComponent({
  name: 'VAvatar',

  props: makeVAvatarProps(),

  slots: makeSlots<VAvatarSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { sizeClasses, sizeStyles } = useSize(vm, props);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      {
        'v-avatar': true,
        'v-avatar--start': props.start,
        'v-avatar--end': props.end,
      },
      themeClasses.value,
      colorClasses.value,
      densityClasses.value,
      roundedClasses.value,
      sizeClasses.value,
      variantClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      colorStyles.value,
      sizeStyles.value,
      styles.value,
    ]) as NormalizedStyle);

    const contentDefaults = computed(() => ({
      VImg: {
        cover: true,
        image: props.image,
      },
      VIcon: {
        icon: props.icon,
      },
    }));

    return {
      expose: {},
      renderInput: {
        contentDefaults,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
