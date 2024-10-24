// Styles
import './VBtnGroup.sass';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVBtnGroupProps = propsFactory({
  baseColor: String,
  divided: Boolean,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps(),
}, 'VBtnGroup');

export interface VBtnGroupSlots extends RawSlots {
  default: never;
}

export const _BtnGroup = defineComponent({
  name: 'VBtnGroup',

  props: makeVBtnGroupProps(),

  slots: makeSlots<VBtnGroupSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { borderClasses } = useBorder(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);

    provideDefaults(vm, ({
      VBtn: {
        height: 'auto',
        baseColor: toRef(props, 'baseColor'),
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
        flat: true,
        variant: toRef(props, 'variant'),
      },
    }));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-btn-group',
      { 'v-btn-group--divided': props.divided },
      themeClasses.value,
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
