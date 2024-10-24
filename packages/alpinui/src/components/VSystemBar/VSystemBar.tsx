// Utilities
import { _SystemBar } from './VSystemBar.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSystemBarSlots } from './VSystemBar.base';

export { makeVSystemBarProps, VSystemBarSlots } from './VSystemBar.base';

export const VSystemBar = genericVueComponent<VSystemBarSlots>()({
  ..._SystemBar,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VSystemBar = InstanceType<typeof VSystemBar>;
