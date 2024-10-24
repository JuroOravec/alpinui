// Components
import { VDataTableColumn } from './VDataTableColumn';
import { VBtn } from '@/components/VBtn';
import { VCheckboxBtn } from '@/components/VCheckbox';

// Utilities
import { toDisplayString, withModifiers } from 'vue';
import { _DataTableRow } from './VDataTableRow.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { CellProps, DataTableItem, ItemKeySlot } from './types';
import type { VDataTableHeaderCellColumnSlotProps } from './VDataTableHeaders.base';
import type { VDataTableRowSlots } from './VDataTableRow.base';
import type { GenericProps } from '@/engines/vue';

export { makeVDataTableRowProps, VDataTableRowSlots } from './VDataTableRow.base';

export const VDataTableRow = genericVueComponent<new <T>(
  props: {
    item?: DataTableItem<T>;
    cellProps?: CellProps<T>;
  },
  slots: VDataTableRowSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._DataTableRow,
  renderHeadless: (
    vm,
    {
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
    { props, slots },
  ) => {
    return (
      <tr
        class={ rootClasses.value }
        onClick={ props.onClick as any }
        onContextmenu={ props.onContextmenu as any }
        onDblclick={ props.onDblclick as any }
      >
        { props.item && columns.value.map((column, i) => {
          const item = props.item!;
          const slotName = `item.${column.key}` as const;
          const headerSlotName = `header.${column.key}` as const;
          const slotProps = {
            index: props.index!,
            item: item.raw,
            internalItem: item,
            value: getObjectValueByPath(item.columns, column.key),
            column,
            isSelected,
            toggleSelect,
            isExpanded,
            toggleExpand,
          } satisfies ItemKeySlot<any>;

          const columnSlotProps: VDataTableHeaderCellColumnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon: () => '',
          };

          const cellProps = typeof props.cellProps === 'function'
            ? props.cellProps({
              index: slotProps.index,
              item: slotProps.item,
              internalItem: slotProps.internalItem,
              value: slotProps.value,
              column,
            })
            : props.cellProps;
          const columnCellProps = typeof column.cellProps === 'function'
            ? column.cellProps({
              index: slotProps.index,
              item: slotProps.item,
              internalItem: slotProps.internalItem,
              value: slotProps.value,
            })
            : column.cellProps;

          return (
            <VDataTableColumn
              align={ column.align }
              class={{
                'v-data-table__td--expanded-row': column.key === 'data-table-expand',
                'v-data-table__td--select-row': column.key === 'data-table-select',
              }}
              fixed={ column.fixed }
              fixedOffset={ column.fixedOffset }
              lastFixed={ column.lastFixed }
              maxWidth={ !mobile.value ? column.maxWidth : undefined }
              noPadding={ column.key === 'data-table-select' || column.key === 'data-table-expand' }
              nowrap={ column.nowrap }
              width={ !mobile.value ? column.width : undefined }
              { ...cellProps }
              { ...columnCellProps }
            >
              {{
                default: () => {
                  if (slots[slotName] && !mobile.value) return slots[slotName]?.(slotProps);

                  if (column.key === 'data-table-select') {
                    return slots['item.data-table-select']?.(slotProps) ?? (
                      <VCheckboxBtn
                        disabled={ !item.selectable }
                        modelValue={ isSelected([item]) }
                        onClick={ withModifiers(() => toggleSelect(item), ['stop']) }
                      />
                    );
                  }

                  if (column.key === 'data-table-expand') {
                    return slots['item.data-table-expand']?.(slotProps) ?? (
                      <VBtn
                        icon={ isExpanded(item) ? '$collapse' : '$expand' }
                        size="small"
                        variant="text"
                        onClick={ withModifiers(() => toggleExpand(item), ['stop']) }
                      />
                    );
                  }

                  const displayValue = toDisplayString(slotProps.value);

                  return !mobile.value ? displayValue : (
                    <>
                      <div class="v-data-table__td-title">
                        { slots[headerSlotName]?.(columnSlotProps) ?? column.title }
                      </div>

                      <div class="v-data-table__td-value">
                        { slots[slotName]?.(slotProps) ?? displayValue }
                      </div>
                    </>
                  );
                },
              }}
            </VDataTableColumn>
          );
        })}
      </tr>
    );
  },
});

export type VDataTableRow = InstanceType<typeof VDataTableRow>;
