// Styles
import './VItemGroup.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeGroupProps, useGroup } from '@/composables/group';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');

export const makeVItemGroupProps = propsFactory({
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: 'v-item--selected',
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VItemGroup');

export type VItemGroupSlots = {
  default: {
    isSelected: (id: number) => boolean;
    select: (id: number, value: boolean) => void;
    next: () => void;
    prev: () => void;
    selected: readonly number[];
  };
}

export const _ItemGroup = defineComponent({
  name: 'VItemGroup',

  props: makeVItemGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VItemGroupSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { isSelected, select, next, prev, selected } = useGroup(vm, props, VItemGroupSymbol);

    const rootClasses = computed(() => normalizeClass([
      'v-item-group',
      themeClasses.value,
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyle: styles,
        isSelected,
        select,
        next,
        prev,
        selected,
      },
    };
  },
  renderHeadless: () => null,
});
