// Utilities
import { _Main } from './VMain.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VMainSlots } from './VMain.base';

export { makeVMainProps, VMainSlots } from './VMain.base';

export const VMain = genericVueComponent<VMainSlots>()({
  ..._Main,
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
        { props.scrollable
          ? (
            <div class="v-main__scroller">
              { slots.default?.() }
            </div>
          )
          : slots.default?.()
        }
      </props.tag>
    );
  },
});

export type VMain = InstanceType<typeof VMain>;
