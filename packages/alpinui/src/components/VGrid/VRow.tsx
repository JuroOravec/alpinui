// Utilities
import { _Row } from './VRow.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VRowSlots } from './VRow.base';

export { makeVRowProps, VRowSlots } from './VRow.base';

export const VRow = genericVueComponent<VRowSlots>()({
  ..._Row,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default?.() }
      </props.tag>
    );
  },
});

export type VRow = InstanceType<typeof VRow>;
