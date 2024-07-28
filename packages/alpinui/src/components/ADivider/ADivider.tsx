// Styles
import './ADivider.sass';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps } from '@/composables/component';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { computed, toRef } from 'alpine-reactivity';
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { useRender } from '@/util/useRender';

type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'height' | 'width'
type DividerStyles = Partial<Record<DividerKey, string>>

export const makeVDividerProps = propsFactory({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'ADivider');

export const ADivider = defineComponent({
  name: 'ADivider',

  props: makeVDividerProps(),

  setup(props, vm) {
    const slots = {} as any; // TODO

    const { themeClasses } = provideTheme(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'));
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

    // Rendering variables
    const hrClasses = computed(() => ({
      'a-divider': true,
      'a-divider--inset': props.inset,
      'a-divider--vertical': props.vertical,
      ...themeClasses.value,
      ...textColorClasses.value,
      ...props.class,
    }));
    const hrStyles = computed(() => ({
      ...dividerStyles.value,
      ...textColorStyles.value,
      ...(props.opacity != null ? { '--v-border-opacity': props.opacity } : {}),
      ...props.style,
    }));
    const hrAriaOrient = computed(() =>
      !vm.$attrs.role || vm.$attrs.role === 'separator'
        ? props.vertical ? 'vertical' : 'horizontal'
        : undefined
    );
    const hrRole = computed(() => `${vm.$attrs.role || 'separator'}`);

    const wrapperClasses = computed(() => ({
      'a-divider__wrapper': true,
      'a-divider__wrapper--vertical': props.vertical,
      'a-divider__wrapper--inset': props.inset,
    }));

    // For reference only
    useRender(() => {
      const divider = (
        <hr
          class={ hrClasses.value }
          style={ hrStyles.value }
          aria-orientation={ hrAriaOrient.value }
          role={ hrRole.value }
        />
      );

      if (!slots.default) return divider;

      return (
        <div
          class={ wrapperClasses.value }
        >
          { divider }

          <div class="a-divider__content">
            { slots.default() }
          </div>

          { divider }
        </div>
      );
    });

    return {
      hrClasses,
      hrStyles,
      hrAriaOrient,
      hrRole,
    };
  },
});

export type ADivider = typeof ADivider;
