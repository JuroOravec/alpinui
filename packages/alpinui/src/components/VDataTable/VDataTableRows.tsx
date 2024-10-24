// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow';
import { VDataTableRow } from './VDataTableRow';

// Utilities
import { Fragment } from 'vue';
import { _DataTableRows } from './VDataTableRows.base';
import { genericVueComponent } from '@/engines/vue';
import { mergeProps } from '@/util/helpers';

// Types
import type { Group } from './composables/group';
import type { DataTableItem, GroupHeaderSlot, ItemSlot } from './types';
import type { VDataTableRowsSlots } from './VDataTableRows.base';
import type { GenericProps } from '@/engines/vue';

export { makeVDataTableRowsProps, VDataTableRowsSlots } from './VDataTableRows.base';

export const VDataTableRows = genericVueComponent<new <T>(
  props: {
    items?: readonly (DataTableItem<T> | Group<T>)[];
  },
  slots: VDataTableRowsSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._DataTableRows,
  renderHeadless: (
    vm,
    {
      columns,
      mobile,
      isExpanded,
      toggleExpand,
      isSelected,
      toggleSelect,
      toggleGroup,
      isGroupOpen,
      expandOnClick,
      genGroupHeaderProps,
      genItemProps,
      loadingText,
      noDataText,
    },
    { attrs, props, slots },
  ) => {
    if (props.loading && (!props.items.length || slots.loading)) {
      return (
        <tr
          class="v-data-table-rows-loading"
          key="loading"
        >
          <td colspan={ columns.value.length }>
            { slots.loading?.() ?? loadingText.value }
          </td>
        </tr>
      );
    }

    if (!props.loading && !props.items.length && !props.hideNoData) {
      return (
        <tr
          class="v-data-table-rows-no-data"
          key="no-data"
        >
          <td colspan={ columns.value.length }>
            { slots['no-data']?.() ?? noDataText.value }
          </td>
        </tr>
      );
    }

    return (
      <>
        { props.items.map((item, index) => {
          if (item.type === 'group') {
            const slotProps = {
              index,
              item,
              columns: columns.value,
              isExpanded,
              toggleExpand,
              isSelected,
              toggleSelect,
              toggleGroup,
              isGroupOpen,
            } satisfies GroupHeaderSlot;

            return slots['group-header'] ? slots['group-header'](slotProps) : (
              <VDataTableGroupHeaderRow
                key={ `group-header_${item.id}` }
                item={ item }
                { ...genGroupHeaderProps(attrs, slotProps) }
                v-slots={ slots }
              />
            );
          }

          const slotProps = {
            index,
            item: item.raw,
            internalItem: item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
          } satisfies ItemSlot<any>;

          const itemSlotProps = {
            ...slotProps,
            props: mergeProps(
              {
                key: `item_${item.key ?? item.index}`,
                onClick: expandOnClick.value ? () => {
                  toggleExpand(item);
                } : undefined,
                index,
                item,
                cellProps: props.cellProps,
                mobile: mobile.value,
              },
              genItemProps(attrs, slotProps),
              typeof props.rowProps === 'function'
                ? props.rowProps({
                  item: slotProps.item,
                  index: slotProps.index,
                  internalItem: slotProps.internalItem,
                })
                : props.rowProps,
            ),
          };

          return (
            <Fragment key={ itemSlotProps.props.key as string }>
              { slots.item ? slots.item(itemSlotProps) : (
                <VDataTableRow
                  { ...itemSlotProps.props }
                  v-slots={ slots }
                />
              )}

              { isExpanded(item) && slots['expanded-row']?.(slotProps) }
            </Fragment>
          );
        })}
      </>
    );
  },
});

export type VDataTableRows = InstanceType<typeof VDataTableRows>;
