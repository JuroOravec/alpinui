// Components
import { VDataTableFooter } from './VDataTableFooter';
import { VDataTableHeaders } from './VDataTableHeaders';
import { VDataTableRows } from './VDataTableRows';
import { VDivider } from '@/components/VDivider/VDivider';
import { VTable } from '@/components/VTable/VTable';

// Utilities
import { _DataTableServer } from './VDataTableServer.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { CellProps, RowProps } from './types';
import type { VDataTableServerSlots } from './VDataTableServer.base';
import type { GenericProps } from '@/engines/vue';
import type { SelectItemKey } from '@/util/helpers';

export { makeVDataTableServerProps, VDataTableServerSlots } from './VDataTableServer.base';

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VDataTableServer = genericVueComponent<new <T extends readonly any[], V>(
  props: {
    items?: T;
    itemValue?: SelectItemKey<ItemType<T>>;
    rowProps?: RowProps<ItemType<T>>;
    cellProps?: CellProps<ItemType<T>>;
    itemSelectable?: SelectItemKey<ItemType<T>>;
    modelValue?: V;
    'onUpdate:modelValue'?: (value: V) => void;
  },
  slots: VDataTableServerSlots<ItemType<T>>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._DataTableServer,
  renderHeadless: (
    vm,
    {
      dataTableFooterProps,
      dataTableHeadersProps,
      dataTableRowsProps,
      tableProps,
      slotProps,
      rootClasses,
      rootStyles,
      flatItems,
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
                <thead key="thead" class="v-data-table__thead" role="rowgroup">
                  <VDataTableHeaders
                    { ...dataTableHeadersProps.value }
                    sticky={ props.fixedHeader }
                    v-slots={ slots }
                  />
                </thead>
              )}
              { slots.thead?.(slotProps.value) }
              { !props.hideDefaultBody && (
                <tbody class="v-data-table__tbody" role="rowgroup">
                  { slots['body.prepend']?.(slotProps.value) }
                  { slots.body ? slots.body(slotProps.value) : (
                    <VDataTableRows
                      { ...attrs }
                      { ...dataTableRowsProps.value }
                      items={ flatItems.value }
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
                  prepend: (...args) => slots['footer.prepend']?.(...args),
                }}
              />
            </>
          ),
        }}
      </VTable>
    );
  },
});

export type VDataTableServer = InstanceType<typeof VDataTableServer>;
