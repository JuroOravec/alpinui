// Styles
import './VIcon.sass';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useIcon } from '@/composables/icons';
import { makeSizeProps, useSize } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { IconValue } from './icons.base';
import type { RawSlots } from '@/engines/types';

export const makeVIconProps = propsFactory({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: IconValue,

  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'i' }),
  ...makeThemeProps(),
}, 'VIcon');

export interface VIconSlots extends RawSlots {
  default: never;
}

export const _Icon = defineComponent({
  name: 'VIcon',

  props: makeVIconProps(),

  slots: makeSlots<VIconSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, toRef } = vm.reactivity;

    const slotIcon = ref<string>();

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { iconData } = useIcon(vm, computed(() => slotIcon.value || props.icon));
    const { sizeClasses } = useSize(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, toRef(props, 'color'));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-icon',
      'notranslate',
      themeClasses.value,
      sizeClasses.value,
      textColorClasses.value,
      {
        'v-icon--disabled': props.disabled,
        'v-icon--start': props.start,
        'v-icon--end': props.end,
      },
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      !sizeClasses.value ? ({
        fontSize: convertToUnit(props.size),
        height: convertToUnit(props.size),
        width: convertToUnit(props.size),
      }) : undefined,
      textColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        iconData,
        rootClasses,
        rootStyles,
        slotIcon,
      },
    };
  },
  renderHeadless: () => null,
});
