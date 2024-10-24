// Styles
import './VSheet.sass';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
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
import type { RawSlots } from '@/engines/types';

export const makeVSheetProps = propsFactory({
  color: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VSheet');

export interface VSheetSlots extends RawSlots {
  default: never;
}

export const _Sheet = defineComponent({
  name: 'VSheet',

  props: makeVSheetProps(),

  slots: makeSlots<VSheetSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { borderClasses } = useBorder(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { locationStyles } = useLocation(vm, props);
    const { positionClasses } = usePosition(vm, props);
    const { roundedClasses } = useRounded(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-sheet',
      themeClasses.value,
      backgroundColorClasses.value,
      borderClasses.value,
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

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
