// Styles
import './VDataTableFooter.sass';

// Components
import { IconValue } from '@/components/VIcon/icons.base';
import { _Pagination } from '@/components/VPagination/VPagination.base';

// Composables
import { usePagination } from './composables/paginate';
import { useLocale } from '@/composables/locale';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RawSlots } from '@/engines/types';

export const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  firstIcon: {
    type: IconValue,
    default: '$first',
  },
  lastIcon: {
    type: IconValue,
    default: '$last',
  },
  itemsPerPageText: {
    type: String,
    default: '$vuetify.dataFooter.itemsPerPageText',
  },
  pageText: {
    type: String,
    default: '$vuetify.dataFooter.pageText',
  },
  firstPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.firstPage',
  },
  prevPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.prevPage',
  },
  nextPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.nextPage',
  },
  lastPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.lastPage',
  },
  itemsPerPageOptions: {
    type: Array as PropType<readonly (number | { title: string, value: number })[]>,
    default: () => ([
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
    ]),
  },
  showCurrentPage: Boolean,
}, 'VDataTableFooter');

export interface VDataTableFooterSlots extends RawSlots {
  prepend: never;
}

export const _DataTableFooter = defineComponent({
  name: 'VDataTableFooter',

  props: makeVDataTableFooterProps(),

  slots: makeSlots<VDataTableFooterSlots>({
    prepend: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { t } = useLocale(vm);
    const { page, pageCount, startIndex, stopIndex, itemsLength, itemsPerPage, setItemsPerPage } = usePagination(vm);

    const itemsPerPageOptions = computed(() => (
      props.itemsPerPageOptions.map((option) => {
        if (typeof option === 'number') {
          return {
            value: option,
            title: option === -1
              ? t('$vuetify.dataFooter.itemsPerPageAll')
              : String(option),
          };
        }

        return {
          ...option,
          title: !isNaN(Number(option.title)) ? option.title : t(option.title),
        };
      })
    ));

    const onUpdateItemsPerPage = (v: number) => setItemsPerPage(Number(v));

    const paginationProps = computed(() => _Pagination.filterProps(props));
    const itemsPerPageText = computed(() => t(props.itemsPerPageText));
    const pageText = computed(() => t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value));

    return {
      expose: {},
      renderInput: {
        paginationProps,
        itemsPerPage,
        itemsPerPageOptions,
        itemsPerPageText,
        onUpdateItemsPerPage,
        page,
        pageCount,
        pageText,
      },
    };
  },
  renderHeadless: () => null,
});
