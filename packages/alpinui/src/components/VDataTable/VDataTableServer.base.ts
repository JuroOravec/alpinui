// Components
import { makeDataTableProps } from './VDataTable.base';
import { _DataTableFooter, makeVDataTableFooterProps } from './VDataTableFooter.base';
import { _DataTableHeaders } from './VDataTableHeaders.base';
import { _DataTableRows } from './VDataTableRows.base';
import { _Table } from '@/components/VTable/VTable.base';

// Composables
import { provideExpanded } from './composables/expand';
import { createGroupBy, provideGroupBy, useGroupedItems } from './composables/group';
import { createHeaders } from './composables/headers';
import { useDataTableItems } from './composables/items';
import { useOptions } from './composables/options';
import { createPagination, makeDataTablePaginateProps, providePagination } from './composables/paginate';
import { provideSelection } from './composables/select';
import { createSort, provideSort } from './composables/sort';
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VDataTableSlotProps, VDataTableSlots } from './VDataTable.base';

export const makeVDataTableServerProps = propsFactory({
  itemsLength: {
    type: [Number, String],
    required: true,
  },

  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeVDataTableFooterProps(),
}, 'VDataTableServer');

export type VDataTableServerSlots<T> = VDataTableSlots<T>;

export const _DataTableServer = defineComponent({
  name: 'VDataTableServer',

  props: makeVDataTableServerProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (page: number) => true,
    'update:itemsPerPage': (page: number) => true,
    'update:sortBy': (sortBy: any) => true,
    'update:options': (options: any) => true,
    'update:expanded': (options: any) => true,
    'update:groupBy': (value: any) => true,
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
    const { computed, provide, toRef, toRefs } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const { groupBy } = createGroupBy(vm, props);
    const { sortBy, multiSort, mustSort } = createSort(vm, props);
    const { page, itemsPerPage } = createPagination(vm, props);
    const { disableSort } = toRefs(props);
    const itemsLength = computed(() => parseInt(props.itemsLength, 10));

    const { columns, headers } = createHeaders(vm, props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    });

    const { items } = useDataTableItems(vm, props, columns);

    const { toggleSort } = provideSort(vm, { sortBy, multiSort, mustSort, page });

    const { opened, isGroupOpen, toggleGroup, extractRows } = provideGroupBy(vm, { groupBy, sortBy, disableSort });

    const { pageCount, setItemsPerPage } = providePagination(vm, { page, itemsPerPage, itemsLength });

    const { flatItems } = useGroupedItems(vm, items, groupBy, opened);

    const { isSelected, select, selectAll, toggleSelect, someSelected, allSelected } = provideSelection(vm, props, {
      allItems: items,
      currentPage: items,
    });

    const { isExpanded, toggleExpand } = provideExpanded(vm, props);

    const itemsWithoutGroups = computed(() => extractRows(items.value));

    useOptions(vm, {
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search: toRef(props, 'search'),
    });

    provide('v-data-table', {
      toggleSort,
      sortBy,
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
      items: itemsWithoutGroups.value.map((item) => item.raw),
      internalItems: itemsWithoutGroups.value,
      groupedItems: flatItems.value,
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
        slotProps,
        rootClasses,
        rootStyles: styles,
        flatItems,
      },
    };
  },
  renderHeadless: () => null,
});
