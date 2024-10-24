// Styles
import './VDataTable.sass';

// Components
import { _DataTableFooter, makeVDataTableFooterProps } from './VDataTableFooter.base';
import { _DataTableHeaders, makeVDataTableHeadersProps } from './VDataTableHeaders.base';
import { _DataTableRows, makeVDataTableRowsProps } from './VDataTableRows.base';
import { _Table, makeVTableProps } from '@/components/VTable/VTable.base';

// Composables
import { makeDataTableExpandProps, provideExpanded } from './composables/expand';
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group';
import { createHeaders, makeDataTableHeaderProps } from './composables/headers';
import { makeDataTableItemsProps, useDataTableItems } from './composables/items';
import { useOptions } from './composables/options';
import { createPagination, makeDataTablePaginateProps, providePagination, usePaginatedItems } from './composables/paginate';
import { makeDataTableSelectProps, provideSelection } from './composables/select';
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from './composables/sort';
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeFilterProps, useFilter } from '@/composables/filter';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { UnwrapRef } from 'vue';
import type { Group } from './composables/group';
import type { DataTableItem, InternalDataTableHeader } from './types';
import type { VDataTableHeadersSlots } from './VDataTableHeaders.base';
import type { VDataTableRowsSlots } from './VDataTableRows.base';

export type VDataTableSlotProps<T> = {
  page: number;
  itemsPerPage: number;
  sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>;
  pageCount: number;
  toggleSort: ReturnType<typeof provideSort>['toggleSort'];
  setItemsPerPage: ReturnType<typeof providePagination>['setItemsPerPage'];
  someSelected: boolean;
  allSelected: boolean;
  isSelected: ReturnType<typeof provideSelection>['isSelected'];
  select: ReturnType<typeof provideSelection>['select'];
  selectAll: ReturnType<typeof provideSelection>['selectAll'];
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect'];
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded'];
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand'];
  isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen'];
  toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup'];
  items: readonly T[];
  internalItems: readonly DataTableItem[];
  groupedItems: readonly (DataTableItem<T> | Group<DataTableItem<T>>)[];
  columns: InternalDataTableHeader[];
  headers: InternalDataTableHeader[][];
}

export type VDataTableSlots<T> = VDataTableRowsSlots<T> & VDataTableHeadersSlots & {
  default: VDataTableSlotProps<T>;
  colgroup: VDataTableSlotProps<T>;
  top: VDataTableSlotProps<T>;
  body: VDataTableSlotProps<T>;
  tbody: VDataTableSlotProps<T>;
  thead: VDataTableSlotProps<T>;
  tfoot: VDataTableSlotProps<T>;
  bottom: VDataTableSlotProps<T>;
  'body.prepend': VDataTableSlotProps<T>;
  'body.append': VDataTableSlotProps<T>;
  'footer.prepend': never;
}

export const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),

  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,

  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps(),
}, 'DataTable');

export const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps(),
}, 'VDataTable');

export const _DataTable = defineComponent({
  name: 'VDataTable',

  props: makeVDataTableProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
    'update:expanded': (value: any) => true,
    'update:currentItems': (value: any) => true,
  },

  slots: makeSlots<VDataTableSlots<any>>({
    default: null,
    colgroup: null,
    top: null,
    body: null,
    tbody: null,
    thead: null,
    tfoot: null,
    bottom: null,
    'body.prepend': null,
    'body.append': null,
    'footer.prepend': null,
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
    headers: null,
    loader: null,
    // TODO - How to handle these?
    'header.<name>': null,
    'item.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef, toRefs } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const { groupBy } = createGroupBy(vm, props);
    const { sortBy, multiSort, mustSort } = createSort(vm, props);
    const { page, itemsPerPage } = createPagination(vm, props);
    const { disableSort } = toRefs(props);

    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions,
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

    const { toggleSort } = provideSort(vm, { sortBy, multiSort, mustSort, page });
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy(vm, { groupBy, sortBy, disableSort });

    const { sortedItems } = useSortedItems(vm, props, filteredItems, sortByWithGroups, {
      transform: (item) => item.columns,
      sortFunctions,
      sortRawFunctions,
    });
    const { flatItems } = useGroupedItems(vm, sortedItems, groupBy, opened);
    const itemsLength = computed(() => flatItems.value.length);

    const { startIndex, stopIndex, pageCount, setItemsPerPage } = providePagination(vm, { page, itemsPerPage, itemsLength });
    const { paginatedItems } = usePaginatedItems(vm, { items: flatItems, startIndex, stopIndex, itemsPerPage });

    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));

    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected,
    } = provideSelection(vm, props, { allItems: items, currentPage: paginatedItemsWithoutGroups });

    const { isExpanded, toggleExpand } = provideExpanded(vm, props);

    useOptions(vm, {
      page,
      itemsPerPage,
      sortBy,
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

    const slotProps = computed<VDataTableSlotProps<any>>(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
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
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value,
    }));

    const dataTableFooterProps = computed(() => _DataTableFooter.filterProps(props));
    const dataTableHeadersProps = computed(() => _DataTableHeaders.filterProps(props));
    const dataTableRowsProps = computed(() => _DataTableRows.filterProps(props));
    const tableProps = computed(() => _Table.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-data-table',
      {
        'v-data-table--show-select': props.showSelect,
        'v-data-table--loading': !!props.loading,
      },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        dataTableFooterProps,
        dataTableHeadersProps,
        dataTableRowsProps,
        tableProps,
        rootClasses,
        rootStyles: styles,
        slotProps,
        paginatedItems,
      },
    };
  },
  renderHeadless: () => null,
});
