// Styles
import './VBadge.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useLocale } from '@/composables/locale';
import { makeLocationProps, useLocation } from '@/composables/location';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, useTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle, pickWithRest } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { IconValue } from '../VIcon/icons.base';

export type VBadgeSlots = {
  default: never;
  badge: never;
}

export const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: '$vuetify.badge',
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true,
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,

  ...makeComponentProps(),
  ...makeLocationProps({ location: 'top end' } as const),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({ transition: 'scale-rotate-transition' }),
}, 'VBadge');

export const _Badge = defineComponent({
  name: 'VBadge',

  inheritAttrs: false,

  slots: makeSlots<VBadgeSlots>({
    default: null,
    badge: null,
  }),

  props: makeVBadgeProps(),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { roundedClasses } = useRounded(vm, props);
    const { t } = useLocale(vm);
    const { textColorClasses, textColorStyles } = useTextColor(vm, toRef(props, 'textColor'));
    const { themeClasses } = useTheme(vm);

    const { locationStyles } = useLocation(vm, props, true, (side) => {
      const base = props.floating
        ? (props.dot ? 2 : 4)
        : (props.dot ? 8 : 12);

      return base + (
        ['top', 'bottom'].includes(side) ? +(props.offsetY ?? 0)
        : ['left', 'right'].includes(side) ? +(props.offsetX ?? 0)
        : 0
      );
    });

    const contentValue = computed(() => Number(props.content));
    const content = computed(() => {
      return (!props.max || isNaN(contentValue.value))
        ? props.content
        : contentValue.value <= +props.max
          ? contentValue.value
          : `${props.max}+`;
    });

    const getBadgeAtts = () => {
      const [badgeAttrs, attrs] = pickWithRest(vm.attrs as Record<string, any>, [
        'aria-atomic',
        'aria-label',
        'aria-live',
        'role',
        'title',
      ]);
      return { badgeAttrs, attrs };
    };

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      {
        'v-badge': true,
        'v-badge--bordered': props.bordered,
        'v-badge--dot': props.dot,
        'v-badge--floating': props.floating,
        'v-badge--inline': props.inline,
      },
      classes.value,
    ]));

    const badgeClasses = computed(() => normalizeClass([
      'v-badge__badge',
      themeClasses.value,
      backgroundColorClasses.value,
      roundedClasses.value,
      textColorClasses.value,
    ]));
    const badgeStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      textColorStyles.value,
      (props.inline ? {} : locationStyles.value),
    ]));
    const badgeAriaLabel = computed(() => t(props.label, contentValue.value));

    return {
      expose: {},
      renderInput: {
        badgeAriaLabel,
        badgeClasses,
        badgeStyles,
        content,
        getBadgeAtts,
        rootClasses,
        styles,
      },
    };
  },
  renderHeadless: () => null,
});
