// Utilities
import { _ToolbarTitle } from './VToolbarTitle.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VToolbarTitleSlots } from './VToolbarTitle.base';

export { makeVToolbarTitleProps, VToolbarTitleSlots } from './VToolbarTitle.base';

export const VToolbarTitle = genericVueComponent<VToolbarTitleSlots>()({
  ..._ToolbarTitle,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    const hasText = !!(slots.default || slots.text || props.text);

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasText && (
          <div class="v-toolbar-title__placeholder">
            { slots.text ? slots.text() : props.text }

            { slots.default?.() }
          </div>
        )}
      </props.tag>
    );
  },
});

export type VToolbarTitle = InstanceType<typeof VToolbarTitle>;
