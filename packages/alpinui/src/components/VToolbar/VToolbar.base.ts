// Styles
import './VToolbar.sass';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { useRtl } from '@/composables/locale';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComponentInternalInstance, PropType } from 'vue';
import type { Slots } from '@/engines/types';

const allowedDensities = [null, 'prominent', 'default', 'comfortable', 'compact'] as const;

export type Density = null | 'prominent' | 'default' | 'comfortable' | 'compact'

export const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String as PropType<Density>,
    default: 'default',
    validator: (v: any) => allowedDensities.includes(v),
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48,
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64,
  },
  image: String,
  title: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'header' }),
  ...makeThemeProps(),
}, 'VToolbar');

export type VToolbarSlots = {
  default: never;
  image: never;
  prepend: never;
  append: never;
  title: never;
  extension: never;
}

export const _Toolbar = defineComponent({
  name: 'VToolbar',

  props: makeVToolbarProps(),

  slots: makeSlots<VToolbarSlots>({
    default: null,
    image: null,
    prepend: null,
    append: null,
    title: null,
    extension: null,
  }),

  setupHeadless(props, vm) {
    const { computed, shallowRef, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { borderClasses } = useBorder(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { rtlClasses } = useRtl(vm);

    // NOTE(Alpinui): In AlpineJS, we don't check for slot content, but only
    // if slot was provided
    const extensionSlot = vm.type === 'vue'
      ? (vm.instance<ComponentInternalInstance>().slots as Slots<VToolbarSlots>).extension?.()
      : vm.hasSlots.extension;
    const isExtended = shallowRef(!!(props.extended || extensionSlot));

    const contentHeight = computed(() => parseInt((
      Number(props.height) +
      (props.density === 'prominent' ? Number(props.height) : 0) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ), 10));
    const extensionHeight = computed(() => isExtended.value
      ? parseInt((
        Number(props.extensionHeight) +
        (props.density === 'prominent' ? Number(props.extensionHeight) : 0) -
        (props.density === 'comfortable' ? 4 : 0) -
        (props.density === 'compact' ? 8 : 0)
      ), 10)
      : 0
    );

    provideDefaults(vm, {
      VBtn: {
        variant: 'text',
      },
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-toolbar',
      {
        'v-toolbar--absolute': props.absolute,
        'v-toolbar--collapse': props.collapse,
        'v-toolbar--flat': props.flat,
        'v-toolbar--floating': props.floating,
        [`v-toolbar--density-${props.density}`]: true,
      },
      backgroundColorClasses.value,
      borderClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      themeClasses.value,
      rtlClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      styles.value,
    ]));

    const contentStyles = computed(() => normalizeStyle([
      { height: convertToUnit(contentHeight.value) },
    ]));

    const extensionStyles = computed(() => normalizeStyle([
      { height: convertToUnit(extensionHeight.value) },
    ]));

    const extensionDefaults = computed(() => ({
      VTabs: {
        height: convertToUnit(extensionHeight.value),
      },
    }));

    const imageDefaults = computed(() => ({
      VImg: {
        cover: true,
        src: props.image,
      },
    }));

    const defaults = computed(() => ({
      VTabs: {
        height: convertToUnit(contentHeight.value),
      },
    }));

    return {
      expose: {
        contentHeight,
        extensionHeight,
      },
      renderInput: {
        isExtended,
        defaults,
        imageDefaults,
        extensionDefaults,
        extensionStyles,
        contentStyles,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
