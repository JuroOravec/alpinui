// Utilities
import { _Col } from './VCol.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VColSlots } from './VCol.base';

export { makeVColProps, VColSlots } from './VCol.base';

export const VCol = genericVueComponent<VColSlots>()({
  ..._Col,
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

export type VCol = InstanceType<typeof VCol>;
