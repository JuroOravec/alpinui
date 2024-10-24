// Utilities
import { _ListSubheader } from './VListSubheader.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListSubheaderSlots } from './VListSubheader.base';

export { makeVListSubheaderProps, VListSubheaderSlots } from './VListSubheader.base';

export const VListSubheader = genericVueComponent<VListSubheaderSlots>()({
  ..._ListSubheader,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    const hasText = !!(slots.default || props.title);

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasText && (
          <div class="v-list-subheader__text">
            { slots.default?.() ?? props.title }
          </div>
        )}
      </props.tag>
    );
  },
});

export type VListSubheader = InstanceType<typeof VListSubheader>;
