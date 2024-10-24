// Components
import { VDataTableColumn } from './VDataTableColumn';
import { VBtn } from '@/components/VBtn';
import { VCheckboxBtn } from '@/components/VCheckbox';

// Utilities
import { _DataTableGroupHeaderRow } from './VDataTableGroupHeaderRow.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow.base';

export { makeVDataTableGroupHeaderRowProps, VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow.base';

export const VDataTableGroupHeaderRow = genericVueComponent<VDataTableGroupHeaderRowSlots>()({
  ..._DataTableGroupHeaderRow,
  renderHeadless: (
    vm,
    {
      columns,
      rows,
      isGroupOpen,
      toggleGroup,
      select,
      isSelected,
      isSomeSelected,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <tr
        class="v-data-table-group-header-row"
        style={ rootStyles.value }
      >
        { columns.value.map((column) => {
          if (column.key === 'data-table-group') {
            const icon = isGroupOpen(props.item) ? '$expand' : '$next';
            const onClick = () => toggleGroup(props.item);

            return slots['data-table-group']?.({ item: props.item, count: rows.value.length, props: { icon, onClick } }) ?? (
              <VDataTableColumn class="v-data-table-group-header-row__column">
                <VBtn
                  size="small"
                  variant="text"
                  icon={ icon }
                  onClick={ onClick }
                />
                <span>{ props.item.value }</span>
                <span>({ rows.value.length })</span>
              </VDataTableColumn>
            );
          }

          if (column.key === 'data-table-select') {
            const modelValue = isSelected(rows.value);
            const indeterminate = isSomeSelected(rows.value) && !modelValue;
            const selectGroup = (v: boolean) => select(rows.value, v);
            return slots['data-table-select']?.({ props: { modelValue, indeterminate, 'onUpdate:modelValue': selectGroup } }) ?? (
              <td>
                <VCheckboxBtn
                  modelValue={ modelValue }
                  indeterminate={ indeterminate }
                  onUpdate:modelValue={ selectGroup }
                />
              </td>
            );
          }

          return <td />;
        })}
      </tr>
    );
  },
});

export type VDataTableGroupHeaderRow = InstanceType<typeof VDataTableGroupHeaderRow>;
