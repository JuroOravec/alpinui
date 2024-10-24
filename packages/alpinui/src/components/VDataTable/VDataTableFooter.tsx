// Components
import { _DataTableFooter } from './VDataTableFooter.base';
import { VPagination } from '@/components/VPagination/VPagination';
import { VSelect } from '@/components/VSelect/VSelect';

// Utilities
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDataTableFooterSlots } from './VDataTableFooter.base';

export { makeVDataTableFooterProps, VDataTableFooterSlots } from './VDataTableFooter.base';

export const VDataTableFooter = genericVueComponent<VDataTableFooterSlots>()({
  ..._DataTableFooter,
  renderHeadless: (
    vm,
    {
      paginationProps,
      itemsPerPage,
      itemsPerPageOptions,
      itemsPerPageText,
      onUpdateItemsPerPage,
      page,
      pageCount,
      pageText,
    },
    { props, slots },
  ) => {
    return (
      <div class="v-data-table-footer">
        { slots.prepend?.() }

        <div class="v-data-table-footer__items-per-page">
          <span>{ itemsPerPageText.value }</span>

          <VSelect
            items={ itemsPerPageOptions.value }
            modelValue={ itemsPerPage.value }
            onUpdate:modelValue={ onUpdateItemsPerPage }
            density="compact"
            variant="outlined"
            hide-details
          />
        </div>

        <div class="v-data-table-footer__info">
          <div>
            { pageText.value }
          </div>
        </div>

        <div class="v-data-table-footer__pagination">
          <VPagination
            v-model={ page.value }
            density="comfortable"
            first-aria-label={ props.firstPageLabel }
            last-aria-label={ props.lastPageLabel }
            length={ pageCount.value }
            next-aria-label={ props.nextPageLabel }
            previous-aria-label={ props.prevPageLabel }
            rounded
            show-first-last-page
            total-visible={ props.showCurrentPage ? 1 : 0 }
            variant="plain"
            { ...paginationProps.value }
          ></VPagination>
        </div>
      </div>
    );
  },
});

export type VDataTableFooter = InstanceType<typeof VDataTableFooter>;
