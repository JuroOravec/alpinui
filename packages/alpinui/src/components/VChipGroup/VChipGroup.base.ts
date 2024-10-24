// Styles
import './VChipGroup.sass';

// Components
import { _SlideGroup, makeVSlideGroupProps } from '@/components/VSlideGroup/VSlideGroup.base';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeGroupProps, useGroup } from '@/composables/group';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { deepEqual, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');

export const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({ selectedClass: 'v-chip--selected' }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'tonal' } as const),
}, 'VChipGroup');

export type VChipGroupSlots = {
  default: {
    isSelected: (id: number) => boolean;
    select: (id: number, value: boolean) => void;
    next: () => void;
    prev: () => void;
    selected: readonly number[];
  };
}

export const _ChipGroup = defineComponent({
  name: 'VChipGroup',

  props: makeVChipGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VChipGroupSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { isSelected, select, next, prev, selected } = useGroup(vm, props, VChipGroupSymbol);

    provideDefaults(vm, {
      VChip: {
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant'),
      },
    });

    const slideGroupProps = computed(() => _SlideGroup.filterProps(props));

    const slideGroupClasses = computed(() => normalizeClass([
      'v-chip-group',
      { 'v-chip-group--column': props.column },
      themeClasses.value,
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        slideGroupProps,
        slideGroupClasses,
        slideGroupStyles: styles,
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
