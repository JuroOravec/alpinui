// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RawSlots } from '@/engines/types';

export interface VDataTableColumnSlots extends RawSlots {
  default: never;
}

export const makeVDataTableColumnProps = propsFactory({
  align: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start',
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean,
}, 'VDataTableColumn');

export const _DataTableColumn = defineComponent({
  name: 'VDataTableColumn',

  props: makeVDataTableColumnProps(),

  slots: makeSlots<VDataTableColumnSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const rootClasses = computed(() => normalizeClass([
      'v-data-table__td',
      {
        'v-data-table-column--fixed': props.fixed,
        'v-data-table-column--last-fixed': props.lastFixed,
        'v-data-table-column--no-padding': props.noPadding,
        'v-data-table-column--nowrap': props.nowrap,
      },
      `v-data-table-column--align-${props.align}`,
    ]));

    const rootStyles = computed(() => normalizeStyle({
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: convertToUnit(props.fixedOffset || null),
    }));

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
