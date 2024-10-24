// Components
import { VBtn } from '../VBtn';

// Utilities
import { _Pagination } from './VPagination.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VPaginationSlots } from './VPagination.base';

export { makeVPaginationProps, VPaginationSlots } from './VPagination.base';

export const VPagination = genericVueComponent<VPaginationSlots>()({
  ..._Pagination,
  renderHeadless: (
    vm,
    {
      controls,
      items,
      resizeRef,
      rootAriaLabel,
      rootClasses,
      rootStyles,
      onKeydown,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        ref={ resizeRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="navigation"
        aria-label={ rootAriaLabel.value }
        onKeydown={ onKeydown }
        data-test="v-pagination-root"
      >
        <ul class="v-pagination__list">
          { props.showFirstLastPage && (
            <li key="first" class="v-pagination__first" data-test="v-pagination-first">
              { slots.first ? slots.first(controls.value.first!) : (
                <VBtn _as="VPaginationBtn" { ...controls.value.first } />
              )}
            </li>
          )}

          <li key="prev" class="v-pagination__prev" data-test="v-pagination-prev">
            { slots.prev ? slots.prev(controls.value.prev) : (
              <VBtn _as="VPaginationBtn" { ...controls.value.prev } />
            )}
          </li>

          { items.value.map((item, index) => (
            <li
              key={ item.key }
              class={[
                'v-pagination__item',
                {
                  'v-pagination__item--is-active': item.isActive,
                },
              ]}
              data-test="v-pagination-item"
            >
              { slots.item ? slots.item(item) : (
                <VBtn _as="VPaginationBtn" { ...item.props }>{ item.page }</VBtn>
              )}
            </li>
          ))}

          <li
            key="next"
            class="v-pagination__next"
            data-test="v-pagination-next"
          >
            { slots.next ? slots.next(controls.value.next) : (
              <VBtn _as="VPaginationBtn" { ...controls.value.next } />
            )}
          </li>

          { props.showFirstLastPage && (
            <li
              key="last"
              class="v-pagination__last"
              data-test="v-pagination-last"
            >
              { slots.last ? slots.last(controls.value.last!) : (
                <VBtn _as="VPaginationBtn" { ...controls.value.last } />
              )}
            </li>
          )}
        </ul>
      </props.tag>
    );
  },
});

export type VPagination = InstanceType<typeof VPagination>;
