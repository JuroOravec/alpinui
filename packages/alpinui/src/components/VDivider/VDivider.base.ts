// Styles
import './VDivider.sass';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { HTMLAttributes } from 'vue';
import type { RawSlots } from '@/engines/types';

type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'height' | 'width'
type DividerStyles = Partial<Record<DividerKey, string>>

export interface VDividerSlots extends RawSlots {
  default: never;
}

export const makeVDividerProps = propsFactory({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VDivider');

export const _Divider = defineComponent({
  name: 'VDivider',

  props: makeVDividerProps(),

  slots: makeSlots<VDividerSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, toRef(props, 'color'));
    const dividerStyles = computed(() => {
      const styles: DividerStyles = {};

      if (props.length) {
        styles[props.vertical ? 'height' : 'width'] = convertToUnit(props.length);
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness);
      }

      return styles;
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const hrClasses = computed(() => normalizeClass([
      {
        'v-divider': true,
        'v-divider--inset': props.inset,
        'v-divider--vertical': props.vertical,
      },
      themeClasses.value,
      textColorClasses.value,
      classes.value,
    ]));
    const hrStyles = computed(() => normalizeStyle([
      dividerStyles.value,
      textColorStyles.value,
      (props.opacity != null ? { '--v-border-opacity': props.opacity } : {}),
      styles.value,
    ]));
    const hrAriaOrient = computed(() =>
      !vm.attrs.role || vm.attrs.role === 'separator'
        ? props.vertical ? 'vertical' : 'horizontal'
        : undefined
    );
    const hrRole = computed(() => `${vm.attrs.role || 'separator'}`);

    const hrProps = computed((): HTMLAttributes => ({
      class: hrClasses.value,
      style: hrStyles.value,
      'aria-orientation': hrAriaOrient.value,
      role: hrRole.value,
    }));

    const wrapperClasses = computed(() => normalizeClass({
      'v-divider__wrapper': true,
      'v-divider__wrapper--vertical': props.vertical,
      'v-divider__wrapper--inset': props.inset,
    }));

    const wrapperProps = computed((): HTMLAttributes => ({
      class: wrapperClasses.value,
    }));

    return {
      expose: {},
      renderInput: {
        hrProps,
        wrapperProps,
      },
    };
  },
  renderHeadless: () => null,
});
