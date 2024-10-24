// Components
import { VDataTableHeaders } from './VDataTableHeaders';
import { VDataTableRow } from './VDataTableRow';
import { VDataTableRows } from './VDataTableRows';
import { VTable } from '@/components/VTable/VTable';
import { VVirtualScrollItem } from '@/components/VVirtualScroll/VVirtualScrollItem';

// Utilities
import { _DataTableVirtual } from './VDataTableVirtual.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { CellProps, RowProps } from './types';
import type { VDataTableVirtualSlots } from './VDataTableVirtual.base';
import type { GenericProps } from '@/engines/vue';
import type { SelectItemKey } from '@/util/helpers';

export { makeVDataTableVirtualProps, VDataTableVirtualSlots } from './VDataTableVirtual.base';

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const VDataTableVirtual = genericVueComponent<new <T extends readonly any[], V>(
  props: {
    items?: T;
    itemValue?: SelectItemKey<ItemType<T>>;
    rowProps?: RowProps<ItemType<T>>;
    cellProps?: CellProps<ItemType<T>>;
    itemSelectable?: SelectItemKey<ItemType<T>>;
    modelValue?: V;
    'onUpdate:modelValue'?: (value: V) => void;
  },
  slots: VDataTableVirtualSlots<ItemType<T>>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._DataTableVirtual,
  renderHeadless: (
    vm,
    {
      bottomStyles,
      columns,
      containerRef,
      containerStyles,
      displayItems,
      dataTableHeadersProps,
      dataTableRowsProps,
      markerRef,
      markerStyles,
      slotProps,
      tableProps,
      rootClasses,
      rootStyles,
      handleScroll,
      handleScrollend,
      handleItemResize,
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
          wrapper: () => (
            <div
              ref={ containerRef }
              onScrollPassive={ handleScroll }
              onScrollend={ handleScrollend }
              class="v-table__wrapper"
              style={ containerStyles.value }
            >
              <table>
                { slots.colgroup?.(slotProps.value) }
                { !props.hideDefaultHeader && (
                  <thead key="thead">
                    <VDataTableHeaders
                      { ...dataTableHeadersProps.value }
                      sticky={ props.fixedHeader }
                      v-slots={ slots }
                    />
                  </thead>
                )}
                { !props.hideDefaultBody && (
                  <tbody>
                    <tr
                      ref={ markerRef }
                      style={ markerStyles.value }
                    >
                      <td
                        colspan={ columns.value.length }
                        style={{ height: 0, border: 0 }}
                      ></td>
                    </tr>

                    { slots['body.prepend']?.(slotProps.value) }

                    <VDataTableRows
                      { ...attrs }
                      { ...dataTableRowsProps.value }
                      items={ displayItems.value }
                    >
                      {{
                        ...slots,
                        item: (itemSlotProps) => (
                          <VVirtualScrollItem
                            key={ itemSlotProps.internalItem.index }
                            renderless
                            onUpdate:height={ (height) => handleItemResize(itemSlotProps.internalItem.index, height) }
                          >
                            { ({ itemRef }) => (
                              slots.item?.({ ...itemSlotProps, itemRef }) ?? (
                                <VDataTableRow
                                  { ...itemSlotProps.props }
                                  ref={ itemRef }
                                  key={ itemSlotProps.internalItem.index }
                                  index={ itemSlotProps.internalItem.index }
                                  v-slots={ slots }
                                />
                              )
                            )}
                          </VVirtualScrollItem>
                        ),
                      }}
                    </VDataTableRows>

                    { slots['body.append']?.(slotProps.value) }

                    <tr
                      style={ bottomStyles.value }
                    >
                      <td colspan={ columns.value.length } style={{ height: 0, border: 0 }}></td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          ),
          bottom: () => slots.bottom?.(slotProps.value),
        }}
      </VTable>
    );
  },
});

export type VDataTableVirtual = InstanceType<typeof VDataTableVirtual>;
