// Composables
import { useExpanded } from './composables/expand';
import { useHeaders } from './composables/headers';
import { useSelection } from './composables/select';
import { useSort } from './composables/sort';
import { makeDisplayProps, useDisplay } from '@/composables/display';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { EventProp, getObjectValueByPath, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { CellProps, DataTableItem, ItemKeySlot } from './types';
import type { VDataTableHeaderCellColumnSlotProps } from './VDataTableHeaders.base';

export type VDataTableRowSlots<T> = {
  'item.data-table-select': Omit<ItemKeySlot<T>, 'value'>;
  'item.data-table-expand': Omit<ItemKeySlot<T>, 'value'>;
  'header.data-table-select': VDataTableHeaderCellColumnSlotProps;
  'header.data-table-expand': VDataTableHeaderCellColumnSlotProps;
} & {
  [key: `item.${string}`]: ItemKeySlot<T>;
  [key: `header.${string}`]: VDataTableHeaderCellColumnSlotProps;
}

export const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object as PropType<DataTableItem>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,
  onClick: EventProp<[MouseEvent]>(),
  onContextmenu: EventProp<[MouseEvent]>(),
  onDblclick: EventProp<[MouseEvent]>(),

  ...makeDisplayProps(),
}, 'VDataTableRow');

export const _DataTableRow = defineComponent({
  name: 'VDataTableRow',

  props: makeVDataTableRowProps(),

  slots: makeSlots<VDataTableRowSlots<any>>({
    'item.data-table-select': null,
    'item.data-table-expand': null,
    'header.data-table-select': null,
    'header.data-table-expand': null,
    // TODO - How to handle these?
    'item.<name>': null,
    'header.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { displayClasses, mobile } = useDisplay(vm, props, 'v-data-table__tr');
    const { isSelected, toggleSelect, someSelected, allSelected, selectAll } = useSelection(vm);
    const { isExpanded, toggleExpand } = useExpanded(vm);
    const { toggleSort, sortBy, isSorted } = useSort(vm);
    const { columns } = useHeaders(vm);

    const rootClasses = computed(() => normalizeClass([
      'v-data-table__tr',
      {
        'v-data-table__tr--clickable': !!(props.onClick || props.onContextmenu || props.onDblclick),
      },
      displayClasses.value,
    ]));

    return {
      expose: {},
      renderInput: {
        columns,
        rootClasses,
        getObjectValueByPath,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand,
        selectAll,
        isSorted,
        toggleSort,
        sortBy,
        someSelected,
        allSelected,
        mobile,
      },
    };
  },
  renderHeadless: () => null,
});
