// Components
import { makeDataTableProps } from './VDataTable.base';
import { _DataTableHeaders } from './VDataTableHeaders.base';
import { _DataTableRows } from './VDataTableRows.base';
import { _Table } from '@/components/VTable/VTable.base';

// Composables
import { provideExpanded } from './composables/expand';
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group';
import { createHeaders } from './composables/headers';
import { useDataTableItems } from './composables/items';
import { useOptions } from './composables/options';
import { provideSelection } from './composables/select';
import { createSort, provideSort, useSortedItems } from './composables/sort';
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeFilterProps, useFilter } from '@/composables/filter';
import { makeVirtualProps, useVirtual } from '@/composables/virtual';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VDataTableSlotProps } from './VDataTable.base';
import type { VDataTableHeadersSlots } from './VDataTableHeaders.base';
import type { VDataTableRowsSlots } from './VDataTableRows.base';
import type { TemplateRef } from '@/util/helpers';

type VDataTableVirtualSlotProps<T> = Omit<
  VDataTableSlotProps<T>,
  | 'setItemsPerPage'
  | 'page'
  | 'pageCount'
  | 'itemsPerPage'
>

export type VDataTableVirtualSlots<T> = VDataTableRowsSlots<T> & VDataTableHeadersSlots & {
  colgroup: VDataTableVirtualSlotProps<T>;
  top: VDataTableVirtualSlotProps<T>;
  headers: VDataTableHeadersSlots['headers'];
  bottom: VDataTableVirtualSlotProps<T>;
  'body.prepend': VDataTableVirtualSlotProps<T>;
  'body.append': VDataTableVirtualSlotProps<T>;
  item: {
    itemRef: TemplateRef;
  };
}

export const makeVDataTableVirtualProps = propsFactory({
  ...makeDataTableProps(),
  ...makeDataTableGroupProps(),
  ...makeVirtualProps(),
  ...makeFilterProps(),
}, 'VDataTableVirtual');

export const _DataTableVirtual = defineComponent({
  name: 'VDataTableVirtual',

  props: makeVDataTableVirtualProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
    'update:expanded': (value: any) => true,
  },

  slots: makeSlots<VDataTableVirtualSlots<any>>({
    colgroup: null,
    top: null,
    headers: null,
    bottom: null,
    'body.prepend': null,
    'body.append': null,
    item: null,
    loading: null,
    'group-header': null,
    'no-data': null,
    'expanded-row': null,
    'data-table-group': null,
    'data-table-select': null,
    'item.data-table-select': null,
    'item.data-table-expand': null,
    'header.data-table-select': null,
    'header.data-table-expand': null,
    loader: null,
    // TODO - How to handle these?
    'item.<name>': null,
    'header.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed, shallowRef, toRef, toRefs } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const { groupBy } = createGroupBy(vm, props);
    const { sortBy, multiSort, mustSort } = createSort(vm, props);
    const { disableSort } = toRefs(props);

    const {
      columns,
      headers,
      filterFunctions,
      sortFunctions,
      sortRawFunctions,
    } = createHeaders(vm, props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    });
    const { items } = useDataTableItems(vm, props, columns);

    const search = toRef(props, 'search');
    const { filteredItems } = useFilter(vm, props, items, search, {
      transform: (item) => item.columns,
      customKeyFilter: filterFunctions,
    });

    const { toggleSort } = provideSort(vm, { sortBy, multiSort, mustSort });
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy(vm, { groupBy, sortBy, disableSort });

    const { sortedItems } = useSortedItems(vm, props, filteredItems, sortByWithGroups, {
      transform: (item) => item.columns,
      sortFunctions,
      sortRawFunctions,
    });
    const { flatItems } = useGroupedItems(vm, sortedItems, groupBy, opened);

    const allItems = computed(() => extractRows(flatItems.value));

    const { isSelected, select, selectAll, toggleSelect, someSelected, allSelected } = provideSelection(vm, props, {
      allItems,
      currentPage: allItems,
    });
    const { isExpanded, toggleExpand } = provideExpanded(vm, props);

    const {
      containerRef,
      markerRef,
      paddingTop,
      paddingBottom,
      computedItems,
      handleItemResize,
      handleScroll,
      handleScrollend,
    } = useVirtual(vm, props, flatItems);
    const displayItems = computed(() => computedItems.value.map((item) => item.raw));

    useOptions(vm, {
      sortBy,
      page: shallowRef(1),
      itemsPerPage: shallowRef(-1),
      groupBy,
      search,
    });

    provideDefaults(vm, {
      VDataTableRows: {
        hideNoData: toRef(props, 'hideNoData'),
        noDataText: toRef(props, 'noDataText'),
        loading: toRef(props, 'loading'),
        loadingText: toRef(props, 'loadingText'),
      },
    });

    const slotProps = computed<VDataTableVirtualSlotProps<any>>(() => ({
      sortBy: sortBy.value,
      toggleSort,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: allItems.value.map((item) => item.raw),
      internalItems: allItems.value,
      groupedItems: flatItems.value,
      columns: columns.value,
      headers: headers.value,
    }));

    const dataTableHeadersProps = computed(() => _DataTableHeaders.filterProps(props));
    const dataTableRowsProps = computed(() => _DataTableRows.filterProps(props));
    const tableProps = computed(() => _Table.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-data-table',
      {
        'v-data-table--loading': !!props.loading,
      },
      classes.value,
    ]));

    const containerStyles = computed(() => normalizeStyle({
      height: convertToUnit(props.height),
    }));

    const markerStyles = computed(() => normalizeStyle({
      height: convertToUnit(paddingTop.value),
      border: 0,
    }));

    const bottomStyles = computed(() => normalizeStyle({
      height: convertToUnit(paddingBottom.value),
      border: 0,
    }));

    return {
      expose: {},
      renderInput: {
        bottomStyles,
        columns,
        containerRef,
        containerStyles,
        displayItems,
        dataTableHeadersProps,
        dataTableRowsProps,
        markerRef,
        markerStyles,
        slotProps,
        tableProps,
        rootClasses,
        rootStyles: styles,
        handleScroll,
        handleScrollend,
        handleItemResize,
      },
    };
  },
  renderHeadless: () => null,
});
