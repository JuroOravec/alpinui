// Composables
import { useHeaders } from './composables/headers';
import { useSelection } from './composables/select';
import { useSort } from './composables/sort';
import { useBackgroundColor } from '@/composables/color';
import { makeDisplayProps, useDisplay } from '@/composables/display';
import { makeLoaderProps, useLoader } from '@/composables/loader';
import { useLocale } from '@/composables/locale';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { CSSProperties, PropType, UnwrapRef } from 'vue';
import type { provideSelection } from './composables/select';
import type { provideSort } from './composables/sort';
import type { InternalDataTableHeader } from './types';
import { IconValue } from '../VIcon/icons.base';
import type { LoaderSlotProps } from '../VLoaderSlot/VLoaderSlot.base';
import type { ItemProps } from '@/composables/list-items';
import type { RawSlots } from '@/engines/types';

export type HeadersSlotProps = {
  headers: InternalDataTableHeader[][];
  columns: InternalDataTableHeader[];
  sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>;
  someSelected: UnwrapRef<ReturnType<typeof provideSelection>['someSelected']>;
  allSelected: UnwrapRef<ReturnType<typeof provideSelection>['allSelected']>;
  toggleSort: ReturnType<typeof provideSort>['toggleSort'];
  selectAll: ReturnType<typeof provideSelection>['selectAll'];
  getSortIcon: (column: InternalDataTableHeader) => IconValue;
  isSorted: ReturnType<typeof provideSort>['isSorted'];
}

export type VDataTableHeaderCellColumnSlotProps = {
  column: InternalDataTableHeader;
  selectAll: ReturnType<typeof provideSelection>['selectAll'];
  isSorted: ReturnType<typeof provideSort>['isSorted'];
  toggleSort: ReturnType<typeof provideSort>['toggleSort'];
  sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>;
  someSelected: UnwrapRef<ReturnType<typeof provideSelection>['someSelected']>;
  allSelected: UnwrapRef<ReturnType<typeof provideSelection>['allSelected']>;
  getSortIcon: (column: InternalDataTableHeader) => IconValue;
}

export type VDataTableHeadersSlots = RawSlots & {
  headers: HeadersSlotProps;
  loader: LoaderSlotProps;
  'header.data-table-select': VDataTableHeaderCellColumnSlotProps;
  'header.data-table-expand': VDataTableHeaderCellColumnSlotProps;
} & { [key: `header.${string}`]: VDataTableHeaderCellColumnSlotProps }

export const makeVDataTableHeadersProps = propsFactory({
  color: String,
  sticky: Boolean,
  disableSort: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: '$sortAsc',
  },
  sortDescIcon: {
    type: IconValue,
    default: '$sortDesc',
  },
  headerProps: {
    type: Object as PropType<Record<string, any>>,
  },

  ...makeDisplayProps(),
  ...makeLoaderProps(),
}, 'VDataTableHeaders');

export const _DataTableHeaders = defineComponent({
  name: 'VDataTableHeaders',

  props: makeVDataTableHeadersProps(),

  slots: makeSlots<VDataTableHeadersSlots>({
    headers: null,
    loader: null,
    'header.data-table-select': null,
    'header.data-table-expand': null,
    // TODO - How to handle this?
    'header.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { t } = useLocale(vm);
    const { toggleSort, sortBy, isSorted } = useSort(vm);
    const { someSelected, allSelected, selectAll, showSelectAll } = useSelection(vm);
    const { columns, headers } = useHeaders(vm);
    const { loaderClasses } = useLoader(vm, props);

    function getFixedStyles(column: InternalDataTableHeader, y: number): CSSProperties | undefined {
      if (!props.sticky && !column.fixed) return undefined;

      return {
        position: 'sticky',
        left: column.fixed ? convertToUnit(column.fixedOffset) : undefined,
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined,
      };
    }

    function getSortIcon(column: InternalDataTableHeader) {
      const item = sortBy.value.find((item) => item.key === column.key);

      if (!item) return props.sortAscIcon;

      return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon;
    }

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, props, 'color');

    const { displayClasses, mobile } = useDisplay(vm, props);

    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon,
    } satisfies HeadersSlotProps));

    const genSortIconClasses = (rawValue: any) => normalizeClass([
      'v-data-table__td-sort-icon',
      isSorted(rawValue) ? 'v-data-table__td-sort-icon-active' : [],
    ]);

    const displayItems = computed<ItemProps['items']>(() => {
      return columns.value.filter((column) => column?.sortable && !props.disableSort);
    });

    const appendIcon = computed(() => {
      const showSelectColumn = columns.value.find((column) => column.key === 'data-table-select');

      if (showSelectColumn == null) return;

      return allSelected.value ? '$checkboxOn' : someSelected.value ? '$checkboxIndeterminate' : '$checkboxOff';
    });

    const sortByText = computed(() => t('$vuetify.dataTable.sortBy'));

    const headerCellClasses = computed(() => ([
      'v-data-table__th',
      {
        'v-data-table__th--sticky': !!props.sticky,
      },
      displayClasses.value,
      loaderClasses.value,
    ]));

    const genColumnClasses = (column: InternalDataTableHeader) => normalizeClass([
      {
        'v-data-table__th--sortable': column.sortable && !props.disableSort,
        'v-data-table__th--sorted': isSorted(column),
        'v-data-table__th--fixed': !!column.fixed,
      },
      ...headerCellClasses.value,
    ]);

    const genColumnStyles = (column: InternalDataTableHeader, y: number) => normalizeStyle({
      width: convertToUnit(column.width),
      minWidth: convertToUnit(column.minWidth),
      maxWidth: convertToUnit(column.maxWidth),
      ...getFixedStyles(column, y),
    });

    return {
      expose: {},
      renderInput: {
        columns,
        headers,
        headerCellClasses,
        displayItems,
        appendIcon,
        toggleSort,
        selectAll,
        isSorted,
        sortBy,
        sortByText,
        someSelected,
        allSelected,
        showSelectAll,
        genColumnClasses,
        genColumnStyles,
        getSortIcon,
        genSortIconClasses,
        backgroundColorClasses,
        backgroundColorStyles,
        slotProps,
        mobile,
      },
    };
  },
  renderHeadless: () => null,
});
