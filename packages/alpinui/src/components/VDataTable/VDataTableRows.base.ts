// Composables
import { useExpanded } from './composables/expand';
import { useGroupBy } from './composables/group';
import { useHeaders } from './composables/headers';
import { useSelection } from './composables/select';
import { makeDisplayProps, useDisplay } from '@/composables/display';
import { useLocale } from '@/composables/locale';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getPrefixedEventHandlers } from '@/util/events';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { Group } from './composables/group';
import type { CellProps, DataTableItem, GroupHeaderSlot, ItemSlot, RowProps } from './types';
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow.base';
import type { VDataTableRowSlots } from './VDataTableRow.base';

export type VDataTableRowsSlots<T> = VDataTableGroupHeaderRowSlots & VDataTableRowSlots<T> & {
  item: ItemSlot<T> & { props: Record<string, any> };
  loading: never;
  'group-header': GroupHeaderSlot;
  'no-data': never;
  'expanded-row': ItemSlot<T>;
}

export const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText',
  },
  hideNoData: Boolean,
  items: {
    type: Array as PropType<readonly (DataTableItem | Group)[]>,
    default: () => ([]),
  },
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  rowProps: [Object, Function] as PropType<RowProps<any>>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,

  ...makeDisplayProps(),
}, 'VDataTableRows');

export const _DataTableRows = defineComponent({
  name: 'VDataTableRows',

  inheritAttrs: false,

  props: makeVDataTableRowsProps(),

  slots: makeSlots<VDataTableRowsSlots<any>>({
    'data-table-group': null,
    'data-table-select': null,
    'item.data-table-select': null,
    'item.data-table-expand': null,
    'header.data-table-select': null,
    'header.data-table-expand': null,
    item: null,
    loading: null,
    'group-header': null,
    'no-data': null,
    'expanded-row': null,
    // TODO - How to handle these?
    'item.<name>': null,
    'header.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { columns } = useHeaders(vm);
    const { expandOnClick, toggleExpand, isExpanded } = useExpanded(vm);
    const { isSelected, toggleSelect } = useSelection(vm);
    const { toggleGroup, isGroupOpen } = useGroupBy(vm);
    const { t } = useLocale(vm);
    const { mobile } = useDisplay(vm, props);

    const genGroupHeaderProps = (
      attrs: Record<string, any>,
      slotProps: GroupHeaderSlot,
    ) => getPrefixedEventHandlers(attrs, ':group-header', () => slotProps);
    const genItemProps = (
      attrs: Record<string, any>,
      slotProps: ItemSlot<any>,
    ) => getPrefixedEventHandlers(attrs, ':row', () => slotProps);

    const loadingText = computed(() => t(props.loadingText));
    const noDataText = computed(() => t(props.noDataText));

    return {
      expose: {},
      renderInput: {
        columns,
        mobile,
        isExpanded,
        toggleExpand,
        isSelected,
        toggleSelect,
        toggleGroup,
        isGroupOpen,
        expandOnClick,
        genGroupHeaderProps,
        genItemProps,
        loadingText,
        noDataText,
      },
    };
  },
  renderHeadless: () => null,
});
