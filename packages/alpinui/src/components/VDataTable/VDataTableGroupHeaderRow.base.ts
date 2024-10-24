// Composables
import { useGroupBy } from './composables/group';
import { useHeaders } from './composables/headers';
import { useSelection } from './composables/select';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { Group } from './composables/group';

export type VDataTableGroupHeaderRowSlots = {
  'data-table-group': { item: Group, count: number, props: Record<string, unknown> };
  'data-table-select': { props: Record<string, unknown> };
}

export const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object as PropType<Group>,
    required: true,
  },
}, 'VDataTableGroupHeaderRow');

export const _DataTableGroupHeaderRow = defineComponent({
  name: 'VDataTableGroupHeaderRow',

  props: makeVDataTableGroupHeaderRowProps(),

  slots: makeSlots<VDataTableGroupHeaderRowSlots>({
    'data-table-group': null,
    'data-table-select': null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { isGroupOpen, toggleGroup, extractRows } = useGroupBy(vm);
    const { isSelected, isSomeSelected, select } = useSelection(vm);
    const { columns } = useHeaders(vm);

    const rows = computed(() => {
      return extractRows([props.item]);
    });

    const rootStyles = computed(() => normalizeStyle([
      {
        '--v-data-table-group-header-row-depth': props.item.depth,
      },
    ]));

    return {
      expose: {},
      renderInput: {
        columns,
        rows,
        isGroupOpen,
        toggleGroup,
        select,
        isSelected,
        isSomeSelected,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
