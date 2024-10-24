// Styles
import './VTabs.sass';

// Components
import { _SlideGroup, makeVSlideGroupProps } from '@/components/VSlideGroup/VSlideGroup.base';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useScopeId } from '@/composables/scopeId';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, isObject, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export type TabItem = string | number | Record<string, any>

export type VTabsSlot = {
  item: TabItem;
}

export type VTabsSlots = {
  default: never;
  tab: VTabsSlot;
  item: VTabsSlot;
  window: never;
} & {
  [key: `tab.${string}`]: VTabsSlot;
  [key: `item.${string}`]: VTabsSlot;
}

function parseItems(items: readonly TabItem[] | undefined) {
  if (!items) return [];

  return items.map((item) => {
    if (!isObject(item)) return { text: item, value: item };

    return item;
  });
}

export const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String as PropType<'start' | 'title' | 'center' | 'end'>,
    default: 'start',
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array as PropType<readonly TabItem[]>,
    default: () => ([]),
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: undefined,
  },
  hideSlider: Boolean,
  sliderColor: String,

  ...makeVSlideGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-tab-item--selected',
  }),
  ...makeDensityProps(),
  ...makeTagProps(),
}, 'VTabs');

export const _Tabs = defineComponent({
  name: 'VTabs',

  props: makeVTabsProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  slots: makeSlots<VTabsSlots>({
    default: null,
    tab: null,
    item: null,
    window: null,
    // TODO - How to handle these?
    'tab.<name>': null,
    'item.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const items = computed(() => parseItems(props.items));
    const { densityClasses } = useDensity(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'bgColor'));
    const { scopeId } = useScopeId(vm);

    provideDefaults(vm, {
      VTab: {
        color: toRef(props, 'color'),
        direction: toRef(props, 'direction'),
        stacked: toRef(props, 'stacked'),
        fixed: toRef(props, 'fixedTabs'),
        sliderColor: toRef(props, 'sliderColor'),
        hideSlider: toRef(props, 'hideSlider'),
      },
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const slideGroupProps = computed(() => _SlideGroup.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-tabs',
      `v-tabs--${props.direction}`,
      `v-tabs--align-tabs-${props.alignTabs}`,
      {
        'v-tabs--fixed-tabs': props.fixedTabs,
        'v-tabs--grow': props.grow,
        'v-tabs--stacked': props.stacked,
      },
      densityClasses.value,
      backgroundColorClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      { '--v-tabs-height': convertToUnit(props.height) },
      backgroundColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        items,
        model,
        slideGroupProps,
        rootClasses,
        rootStyles,
        scopeId,
      },
    };
  },
  renderHeadless: () => null,
});
