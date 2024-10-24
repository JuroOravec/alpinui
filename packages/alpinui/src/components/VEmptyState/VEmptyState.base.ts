// Styles
import './VEmptyState.sass';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { useDisplay } from '@/composables/display';
import { makeSizeProps } from '@/composables/size';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';

// Types

export type VEmptyStateSlots = {
  actions: {
    props: {
      onClick: (e: Event) => void;
    };
  };
  default: never;
  headline: never;
  title: never;
  media: never;
  text: never;
}

export const makeVEmptyStateProps = propsFactory({
  actionText: String,
  bgColor: String,
  color: String,
  icon: IconValue,
  image: String,
  justify: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'center',
  },
  headline: String,
  title: String,
  text: String,
  textWidth: {
    type: [Number, String],
    default: 500,
  },
  href: String,
  to: String,

  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeSizeProps({ size: undefined }),
  ...makeThemeProps(),
}, 'VEmptyState');

export const _EmptyState = defineComponent({
  name: 'VEmptyState',

  props: makeVEmptyStateProps(),

  emits: {
    'click:action': (e: Event) => true,
  },

  slots: makeSlots<VEmptyStateSlots>({
    actions: null,
    default: null,
    headline: null,
    title: null,
    media: null,
    text: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'bgColor'));
    const { dimensionStyles } = useDimension(vm, props);
    const { displayClasses } = useDisplay(vm);

    function onClickAction(e: Event) {
      vm.emit('click:action', e);
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const size = computed(() => props.size || (props.image ? 200 : 96));

    const rootClasses = computed(() => normalizeClass([
      'v-empty-state',
      {
        [`v-empty-state--${props.justify}`]: true,
      },
      themeClasses.value,
      backgroundColorClasses.value,
      displayClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      dimensionStyles.value,
      styles.value,
    ]));

    const textStyles = computed(() => normalizeStyle({
      maxWidth: convertToUnit(props.textWidth),
    }));

    const mediaDefaults = computed(() => ({
      VImg: {
        src: props.image,
        height: size.value,
      },
      VIcon: {
        size: size.value,
        icon: props.icon,
      },
    }));

    const actionDefaults = computed(() => ({
      VBtn: {
        class: 'v-empty-state__action-btn',
        color: props.color ?? 'surface-variant',
        text: props.actionText,
      },
    }));

    return {
      expose: {},
      renderInput: {
        size,
        actionDefaults,
        mediaDefaults,
        rootClasses,
        rootStyles,
        textStyles,
        onClickAction,
      },
    };
  },
  renderHeadless: () => null,
});
