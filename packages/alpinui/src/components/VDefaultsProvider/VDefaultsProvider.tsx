// Types
import type { VDefaultsProviderSlots } from './VDefaultsProvider.base';
import { _DefaultsProvider } from './VDefaultsProvider.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVDefaultsProviderProps } from './VDefaultsProvider.base';

export const VDefaultsProvider = genericVueComponent<VDefaultsProviderSlots>()({
  ..._DefaultsProvider,
  renderHeadless: (vm, renderInput, { slots }) => {
    return slots.default?.() ?? null;
  },
});

export type VDefaultsProvider = InstanceType<typeof VDefaultsProvider>;
