// Components
import { VDataTableColumn } from './VDataTableColumn';
import { _DataTableHeaders } from './VDataTableHeaders.base';
import { VCheckboxBtn } from '@/components/VCheckbox/VCheckboxBtn';
import { VChip } from '@/components/VChip/VChip';
import { VIcon } from '@/components/VIcon/VIcon';
import { VLoaderSlot } from '@/components/VLoaderSlot/VLoaderSlot';
import { VSelect } from '@/components/VSelect/VSelect';

// Utilities
import { genericVueComponent } from '@/engines/vue';
import { mergeProps } from '@/util/helpers';

// Types
import type { InternalDataTableHeader } from './types';
import type { VDataTableHeaderCellColumnSlotProps, VDataTableHeadersSlots } from './VDataTableHeaders.base';
import type { LoaderSlotProps } from '@/components/VLoaderSlot/VLoaderSlot';
import type { Slots } from '@/engines/types';

export {
  makeVDataTableHeadersProps,
  VDataTableHeadersSlots,
  HeadersSlotProps,
  VDataTableHeaderCellColumnSlotProps,
} from './VDataTableHeaders.base';

export const VDataTableHeaders = genericVueComponent<VDataTableHeadersSlots>()({
  ..._DataTableHeaders,
  slots: _DataTableHeaders.slots as Slots<VDataTableHeadersSlots>,

  renderHeadless: (
    vm,
    {
      columns,
      headers,
      headerCellClasses,
      genColumnClasses,
      genColumnStyles,
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
      getSortIcon,
      genSortIconClasses,
      backgroundColorClasses,
      backgroundColorStyles,
      slotProps,
      mobile,
    },
    { props, slots },
  ) => {
    const VDataTableHeaderCell = ({ column, x, y }: { column: InternalDataTableHeader, x: number, y: number }) => {
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand';
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {});

      return (
        <VDataTableColumn
          tag="th"
          align={ column.align }
          class={ genColumnClasses(column) }
          style={ genColumnStyles(column, y) }
          colspan={ column.colspan }
          rowspan={ column.rowspan }
          onClick={ column.sortable ? () => toggleSort(column) : undefined }
          fixed={ column.fixed }
          nowrap={ column.nowrap }
          lastFixed={ column.lastFixed }
          noPadding={ noPadding }
          { ...headerProps }
        >
          {{
            default: () => {
              const columnSlotName = `header.${column.key}` as const;
              const columnSlotProps: VDataTableHeaderCellColumnSlotProps = {
                column,
                selectAll,
                isSorted,
                toggleSort,
                sortBy: sortBy.value,
                someSelected: someSelected.value,
                allSelected: allSelected.value,
                getSortIcon,
              };

              if (slots[columnSlotName]) return slots[columnSlotName]!(columnSlotProps);

              if (column.key === 'data-table-select') {
                return slots['header.data-table-select']?.(columnSlotProps) ?? (showSelectAll.value && (
                  <VCheckboxBtn
                    modelValue={ allSelected.value }
                    indeterminate={ someSelected.value && !allSelected.value }
                    onUpdate:modelValue={ selectAll }
                  />
                ));
              }

              return (
                <div class="v-data-table-header__content">
                  <span>{ column.title }</span>
                  { column.sortable && !props.disableSort && (
                    <VIcon
                      key="icon"
                      class="v-data-table-header__sort-icon"
                      icon={ getSortIcon(column) }
                    />
                  )}
                  { props.multiSort && isSorted(column) && (
                    <div
                      key="badge"
                      class={[
                        'v-data-table-header__sort-badge',
                        ...backgroundColorClasses.value,
                      ]}
                      style={ backgroundColorStyles.value }
                    >
                      { sortBy.value.findIndex((x) => x.key === column.key) + 1 }
                    </div>
                  )}
                </div>
              );
            },
          }}
        </VDataTableColumn>
      );
    };

    const VDataTableMobileHeaderCell = () => {
      const headerProps = mergeProps(props.headerProps ?? {} ?? {});

      return (
        <VDataTableColumn
          tag="th"
          class={[
            ...headerCellClasses.value,
          ]}
          colspan={ headers.value.length + 1 }
          { ...headerProps }
        >
          <div class="v-data-table-header__content">
            <VSelect
              chips
              class="v-data-table__td-sort-select"
              clearable
              density="default"
              items={ displayItems.value }
              label={ sortByText.value }
              multiple={ props.multiSort }
              variant="underlined"
              onClick:clear={ () => sortBy.value = [] }
              appendIcon={ appendIcon.value }
              onClick:append={ () => selectAll(!allSelected.value) }
            >
              {{
                ...slots,
                chip: (props) => (
                  <VChip
                    onClick={ props.item.raw?.sortable ? () => toggleSort(props.item.raw) : undefined }
                    onMousedown={ (e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    { props.item.title }
                    <VIcon
                      class={ genSortIconClasses(props.item.raw) }
                      icon={ getSortIcon(props.item.raw) }
                      size="small"
                    />
                  </VChip>
                ),
              }}
            </VSelect>
          </div>
        </VDataTableColumn>
      );
    };

    return mobile.value ? (
      <tr>
        <VDataTableMobileHeaderCell />
      </tr>
    ) : (
      <>
        { slots.headers
          ? slots.headers(slotProps.value)
          : headers.value.map((row, y) => (
            <tr>
              { row.map((column, x) => (
                <VDataTableHeaderCell column={ column } x={ x } y={ y } />
              ))}
            </tr>
          ))}

        { props.loading && (
          <tr class="v-data-table-progress">
            <th colspan={ columns.value.length }>
              <VLoaderSlot
                name="v-data-table-progress"
                absolute
                active
                color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                indeterminate
                v-slots={{ default: ((ctx: LoaderSlotProps) => slots.loader?.(ctx)) as any }}
              />
            </th>
          </tr>
        )}
      </>
    );
  },
});

export type VDataTableHeaders = InstanceType<typeof VDataTableHeaders>;
