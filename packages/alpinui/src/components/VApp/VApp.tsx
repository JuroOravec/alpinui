// Utilities
import { Suspense } from 'vue';
import { _App } from './VApp.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVAppProps } from './VApp.base';

export const VApp = genericVueComponent()({
  ..._App,
  renderHeadless: (
    vm,
    { layoutRef, rootClasses, styles },
    { slots }
  ) => (
    <div
      ref={ layoutRef }
      class={ rootClasses.value }
      style={ styles.value }
    >
      <div class="v-application__wrap">
        <Suspense>
          <>
            { slots.default?.() }
          </>
        </Suspense>
      </div>
    </div>
  ),
});

export type VApp = InstanceType<typeof VApp>;
