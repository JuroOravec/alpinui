// Components
import { VDataTableFooter } from './VDataTableFooter';
import { VDataTableHeaders } from './VDataTableHeaders';
import { VDataTableRows } from './VDataTableRows';
import { VDivider } from '@/components/VDivider';
import { VTable } from '@/components/VTable/VTable';

// Utilities
import { _DataTable } from './VDataTable.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { DeepReadonly } from 'vue';
import type { CellProps, DataTableHeader, RowProps } from './types';
import type { VDataTableSlots } from './VDataTable.base';
import type { GenericProps } from '@/engines/vue';
import type { SelectItemKey } from '@/util/helpers';

export { makeVDataTableProps, VDataTableSlots, VDataTableSlotProps, makeDataTableProps } from './VDataTable.base';

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VDataTable = genericVueComponent<new <T extends readonly any[], V>(
  props: {
    items?: T;
    itemValue?: SelectItemKey<ItemType<T>>;
    rowProps?: RowProps<ItemType<T>>;
    cellProps?: CellProps<ItemType<T>>;
    itemSelectable?: SelectItemKey<ItemType<T>>;
    headers?: DeepReadonly<DataTableHeader<ItemType<T>>[]>;
    modelValue?: V;
    'onUpdate:modelValue'?: (value: V) => void;
  },
  slots: VDataTableSlots<ItemType<T>>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._DataTable,
  renderHeadless: (
    vm,
    {
      dataTableFooterProps,
      dataTableHeadersProps,
      dataTableRowsProps,
      tableProps,
      rootClasses,
      rootStyles,
      slotProps,
      paginatedItems,
    },
    { attrs, props, slots },
  ) => {
    return (
      <VTable
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...tableProps.value }
      >
        {{
          top: () => slots.top?.(slotProps.value),
          default: () => slots.default ? slots.default(slotProps.value) : (
            <>
              { slots.colgroup?.(slotProps.value) }
              { !props.hideDefaultHeader && (
                <thead key="thead">
                  <VDataTableHeaders
                    { ...dataTableHeadersProps.value }
                    v-slots={ slots }
                  />
                </thead>
              )}
              { slots.thead?.(slotProps.value) }
              { !props.hideDefaultBody && (
                <tbody>
                  { slots['body.prepend']?.(slotProps.value) }
                  { slots.body ? slots.body(slotProps.value) : (
                    <VDataTableRows
                      { ...attrs }
                      { ...dataTableRowsProps.value }
                      items={ paginatedItems.value }
                      v-slots={ slots }
                    />
                  )}
                  { slots['body.append']?.(slotProps.value) }
                </tbody>
              )}
              { slots.tbody?.(slotProps.value) }
              { slots.tfoot?.(slotProps.value) }
            </>
          ),
          bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && (
            <>
              <VDivider />

              <VDataTableFooter
                { ...dataTableFooterProps.value }
                v-slots={{
                  prepend: slots['footer.prepend'] as any,
                }}
              />
            </>
          ),
        }}
      </VTable>
    );
  },
});

export type VDataTable = InstanceType<typeof VDataTable>;
