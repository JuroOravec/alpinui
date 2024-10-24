// Components
import { makeDataTableExpandProps, provideExpanded } from '@/components/VDataTable/composables/expand';
import { makeDataTableGroupProps, provideGroupBy, useGroupedItems } from '@/components/VDataTable/composables/group';
import { useOptions } from '@/components/VDataTable/composables/options';
import {
  createPagination,
  makeDataTablePaginateProps,
  providePagination,
  usePaginatedItems,
} from '@/components/VDataTable/composables/paginate';
import { makeDataTableSelectProps, provideSelection } from '@/components/VDataTable/composables/select';
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from '@/components/VDataTable/composables/sort';

// Composables
import { makeDataIteratorItemsProps, useDataIteratorItems } from './composables/items';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeFilterProps, useFilter } from '@/composables/filter';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component } from 'vue';
import type { DataIteratorItem } from './composables/items';
import { makeTransitionProps } from '../MaybeTransition/MaybeTransition.base';
import type { LoaderSlotProps } from '../VLoaderSlot/VLoaderSlot.base';
import type { Group } from '@/components/VDataTable/composables/group';
import type { SortItem } from '@/components/VDataTable/composables/sort';

type VDataIteratorSlotProps<T> = {
  page: number;
  itemsPerPage: number;
  sortBy: readonly SortItem[];
  pageCount: number;
  toggleSort: ReturnType<typeof provideSort>['toggleSort'];
  prevPage: ReturnType<typeof providePagination>['prevPage'];
  nextPage: ReturnType<typeof providePagination>['nextPage'];
  setPage: ReturnType<typeof providePagination>['setPage'];
  setItemsPerPage: ReturnType<typeof providePagination>['setItemsPerPage'];
  isSelected: ReturnType<typeof provideSelection>['isSelected'];
  select: ReturnType<typeof provideSelection>['select'];
  selectAll: ReturnType<typeof provideSelection>['selectAll'];
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect'];
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded'];
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand'];
  isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen'];
  toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup'];
  items: readonly DataIteratorItem<T>[];
  groupedItems: readonly (DataIteratorItem<T> | Group<DataIteratorItem<T>>)[];
}

export type VDataIteratorSlots<T> = {
  default: VDataIteratorSlotProps<T>;
  header: VDataIteratorSlotProps<T>;
  footer: VDataIteratorSlotProps<T>;
  loader: LoaderSlotProps;
  'no-data': never;
}

export const makeVDataIteratorProps = propsFactory({
  search: String,
  loading: Boolean,

  ...makeComponentProps(),
  ...makeDataIteratorItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeDataTablePaginateProps({ itemsPerPage: 5 }),
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeFilterProps(),
  ...makeTagProps(),
  ...makeTransitionProps({
    transition: {
      // NOTE(Alpinui): This is set in the Vue file to avoid import Vue in the headless file
      component: null as any as Component,
      hideOnLeave: true,
    },
  }),
}, 'VDataIterator');

export const _DataIterator = defineComponent({
  name: 'VDataIterator',

  props: makeVDataIteratorProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:groupBy': (value: any) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:expanded': (value: any) => true,
    'update:currentItems': (value: any) => true,
  },

  slots: makeSlots<VDataIteratorSlots<any>>({
    default: null,
    header: null,
    footer: null,
    loader: null,
    'no-data': null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const groupBy = useProxiedModel(vm, props, 'groupBy');
    const search = toRef(props, 'search');

    const { items } = useDataIteratorItems(vm, props);
    const { filteredItems } = useFilter(vm, props, items, search, { transform: (item) => item.raw });

    const { sortBy, multiSort, mustSort } = createSort(vm, props);
    const { page, itemsPerPage } = createPagination(vm, props);

    const { toggleSort } = provideSort(vm, { sortBy, multiSort, mustSort, page });
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy(vm, { groupBy, sortBy });

    const { sortedItems } = useSortedItems(vm, props, filteredItems, sortByWithGroups, { transform: (item) => item.raw });
    const { flatItems } = useGroupedItems(vm, sortedItems, groupBy, opened);

    const itemsLength = computed(() => flatItems.value.length);

    const {
      startIndex,
      stopIndex,
      pageCount,
      prevPage,
      nextPage,
      setItemsPerPage,
      setPage,
    } = providePagination(vm, { page, itemsPerPage, itemsLength });
    const { paginatedItems } = usePaginatedItems(vm, { items: flatItems, startIndex, stopIndex, itemsPerPage });

    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));

    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
    } = provideSelection(vm, props, { allItems: items, currentPage: paginatedItemsWithoutGroups });
    const { isExpanded, toggleExpand } = provideExpanded(vm, props);

    useOptions(vm, {
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search,
    });

    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      prevPage,
      nextPage,
      setPage,
      setItemsPerPage,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
    }));

    const rootClasses = computed(() => normalizeClass([
      'v-data-iterator',
      { 'v-data-iterator--loading': props.loading },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        paginatedItems,
        slotProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
