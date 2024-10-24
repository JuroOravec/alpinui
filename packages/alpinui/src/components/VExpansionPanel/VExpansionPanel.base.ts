// Components
import { VExpansionPanelSymbol } from './shared';
import { _ExpansionPanelText, makeVExpansionPanelTextProps } from './VExpansionPanelText.base';
import { _ExpansionPanelTitle, makeVExpansionPanelTitleProps } from './VExpansionPanelTitle.base';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { useComponent } from '@/composables/component';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeGroupItemProps, useGroupItem } from '@/composables/group';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,

  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps(),
}, 'VExpansionPanel');

export type VExpansionPanelSlots = {
  default: never;
  title: never;
  text: never;
}

export const _ExpansionPanel = defineComponent({
  name: 'VExpansionPanel',

  props: makeVExpansionPanelProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  slots: makeSlots<VExpansionPanelSlots>({
    default: null,
    title: null,
    text: null,
  }),

  setupHeadless(props, vm) {
    const { computed, provide } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const groupItem = useGroupItem(vm, props, VExpansionPanelSymbol);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, props, 'bgColor');
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const isDisabled = computed(() => groupItem?.disabled.value || props.disabled);

    const selectedIndices = computed(() => groupItem.group.items.value.reduce<number[]>((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));

    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value &&
        selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });

    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value &&
        selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });

    provide(VExpansionPanelSymbol, groupItem);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const expansionPanelTitleProps = computed(() => _ExpansionPanelTitle.filterProps(props));
    const expansionPanelTextProps = computed(() => _ExpansionPanelText.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-expansion-panel',
      {
        'v-expansion-panel--active': groupItem.isSelected.value,
        'v-expansion-panel--before-active': isBeforeSelected.value,
        'v-expansion-panel--after-active': isAfterSelected.value,
        'v-expansion-panel--disabled': isDisabled.value,
      },
      roundedClasses.value,
      backgroundColorClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      styles.value,
    ]));

    const shadowClasses = computed(() => normalizeClass([
      'v-expansion-panel__shadow',
      elevationClasses.value,
    ]));

    const defaults = computed(() => ({
      VExpansionPanelTitle: {
        ...expansionPanelTitleProps.value,
      },
      VExpansionPanelText: {
        ...expansionPanelTextProps.value,
      },
    }));

    return {
      expose: {
        groupItem,
      },
      renderInput: {
        defaults,
        shadowClasses,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
