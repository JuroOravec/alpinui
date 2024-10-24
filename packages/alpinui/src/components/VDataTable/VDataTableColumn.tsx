// Utilities
import { _DataTableColumn } from './VDataTableColumn.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDataTableColumnSlots } from './VDataTableColumn.base';

export { makeVDataTableColumnProps, VDataTableColumnSlots } from './VDataTableColumn.base';

export const VDataTableColumn = genericVueComponent<VDataTableColumnSlots>()({
  ..._DataTableColumn,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    const Tag = props.tag ?? 'td';
    return (
      <Tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default?.() }
      </Tag>
    );
  },
});

export type VDataTableColumn = InstanceType<typeof VDataTableColumn>;
