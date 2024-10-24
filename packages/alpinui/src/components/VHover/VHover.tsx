// Utilities
import { _Hover } from './VHover.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VHoverSlots } from './VHover.base';

export { makeVHoverProps, VHoverSlots } from './VHover.base';

export const VHover = genericVueComponent<VHoverSlots>()({
  ..._Hover,
  renderHeadless: (
    vm,
    { isHovering, runCloseDelay, runOpenDelay },
    { slots },
  ) => {
    return slots.default?.({
      isHovering: isHovering.value,
      props: {
        onMouseenter: runOpenDelay,
        onMouseleave: runCloseDelay,
      },
    }) ?? null;
  },
});

export type VHover = InstanceType<typeof VHover>;
