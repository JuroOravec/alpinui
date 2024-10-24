// Styles
import './VBottomNavigation.sass';

// Components
import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle.base';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeGroupProps, useGroup } from '@/composables/group';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { useSsrBoot } from '@/composables/ssrBoot';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, useTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVBottomNavigationProps = propsFactory({
  baseColor: String,
  bgColor: String,
  color: String,
  grow: Boolean,
  mode: {
    type: String,
    validator: (v: any) => !v || ['horizontal', 'shift'].includes(v),
  },
  height: {
    type: [Number, String],
    default: 56,
  },
  active: {
    type: Boolean,
    default: true,
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeLayoutItemProps({ name: 'bottom-navigation' }),
  ...makeTagProps({ tag: 'header' }),
  ...makeGroupProps({ selectedClass: 'v-btn--selected' }),
  ...makeThemeProps(),
}, 'VBottomNavigation');

export interface VBottomNavigationSlots extends RawSlots {
  default: never;
}

export const _BottomNavigation = defineComponent({
  name: 'VBottomNavigation',

  props: makeVBottomNavigationProps(),

  emits: {
    'update:active': (value: any) => true,
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VBottomNavigationSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { themeClasses } = useTheme(vm);
    const { borderClasses } = useBorder(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'bgColor'));
    const { densityClasses } = useDensity(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { ssrBootStyles } = useSsrBoot(vm);
    const height = computed(() => (
      Number(props.height) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ));
    const isActive = useProxiedModel(vm, props, 'active', props.active);
    const { layoutItemStyles, layoutIsReady } = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => 'bottom'),
      layoutSize: computed(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(props, 'absolute'),
    });

    useGroup(vm, props, VBtnToggleSymbol);

    provideDefaults(vm, {
      VBtn: {
        baseColor: toRef(props, 'baseColor'),
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
        stacked: computed(() => props.mode !== 'horizontal'),
        variant: 'text',
      },
    }, { scoped: true });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-bottom-navigation',
      {
        'v-bottom-navigation--active': isActive.value,
        'v-bottom-navigation--grow': props.grow,
        'v-bottom-navigation--shift': props.mode === 'shift',
      },
      themeClasses.value,
      backgroundColorClasses.value,
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      layoutItemStyles.value,
      { height: convertToUnit(height.value) },
      ssrBootStyles.value,
      styles.value,
    ]));

    return {
      expose: layoutIsReady,
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
