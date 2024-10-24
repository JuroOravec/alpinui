// Utilities
import { Suspense } from 'vue';
import { _Layout } from './VLayout.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VLayoutSlots } from './VLayout.base';

export { makeVLayoutProps, VLayoutSlots } from './VLayout.base';

export const VLayout = genericVueComponent<VLayoutSlots>()({
  ..._Layout,
  renderHeadless: (
    vm,
    { layoutRef, rootClasses, rootStyles },
    { slots },
  ) => {
    return (
      <div
        ref={ layoutRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <Suspense>
          <>
            { slots.default?.() }
          </>
        </Suspense>
      </div>
    );
  },
});

export type VLayout = InstanceType<typeof VLayout>;
