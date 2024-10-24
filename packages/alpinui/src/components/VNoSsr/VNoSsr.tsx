// Utilities
import { _NoSsr } from './VNoSsr.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VNoSsrSlots } from './VNoSsr.base';

export { VNoSsrSlots } from './VNoSsr.base';

export const VNoSsr = genericVueComponent<VNoSsrSlots>()({
  ..._NoSsr,
  renderHeadless: (
    vm,
    { show },
    { slots },
  ) => {
    return show.value ? slots.default?.() ?? null : null;
  },
});

export type VNoSsr = InstanceType<typeof VNoSsr>;
