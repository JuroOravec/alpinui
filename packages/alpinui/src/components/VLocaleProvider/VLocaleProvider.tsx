// Utilities
import { _LocaleProvider } from './VLocaleProvider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VLocaleProviderSlots } from './VLocaleProvider.base';

export { makeVLocaleProviderProps, VLocaleProviderSlots } from './VLocaleProvider.base';

export const VLocaleProvider = genericVueComponent<VLocaleProviderSlots>()({
  ..._LocaleProvider,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default?.() }
      </div>
    );
  },
});

export type VLocaleProvider = InstanceType<typeof VLocaleProvider>;
