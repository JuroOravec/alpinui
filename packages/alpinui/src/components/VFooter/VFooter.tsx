// Utilities
import { _Footer } from './VFooter.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VFooterSlots } from './VFooter.base';

export { makeVFooterProps, VFooterSlots } from './VFooter.base';

export const VFooter = genericVueComponent<VFooterSlots>()({
  ..._Footer,
  renderHeadless: (
    vm,
    { resizeRef, rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        ref={ resizeRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VFooter = InstanceType<typeof VFooter>;
