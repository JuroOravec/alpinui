// Utilities
import { _Table } from './VTable.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTableSlots } from './VTable.base';

export { makeVTableProps, VTableSlots } from './VTable.base';

export const VTable = genericVueComponent<VTableSlots>()({
  ..._Table,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
      wrapperStyles,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.top?.() }

        { slots.default ? (
          <div
            class="v-table__wrapper"
            style={ wrapperStyles.value }
          >
            <table>
              { slots.default() }
            </table>
          </div>
        ) : slots.wrapper?.()}

        { slots.bottom?.() }
      </props.tag>
    );
  },
});

export type VTable = InstanceType<typeof VTable>;
