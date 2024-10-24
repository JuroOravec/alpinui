// Utilities
import { _ListGroupActivator } from './VListGroupActivator.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListGroupActivatorSlots } from './VListGroupActivator.base';

export { makeVListGroupActivatorProps, VListGroupActivatorSlots } from './VListGroupActivator.base';

export const VListGroupActivator = genericVueComponent<VListGroupActivatorSlots>()({
  ..._ListGroupActivator,
  renderHeadless: (vm, _, { slots }) => {
    return slots.default?.() ?? null;
  },
});

export type VListGroupActivator = InstanceType<typeof VListGroupActivator>;
