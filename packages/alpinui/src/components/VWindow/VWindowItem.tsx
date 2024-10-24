// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';

// Directives
import { Touch } from '@/directives/touch';

// Utilities
import { _WindowItem } from './VWindowItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VWindowItemSlots } from './VWindowItem.base';

export { makeVWindowItemProps, VWindowItemSlots } from './VWindowItem.base';

export const VWindowItem = genericVueComponent<VWindowItemSlots>()({
  ..._WindowItem,

  directives: { Touch },

  renderHeadless: (
    vm,
    {
      groupItem,
      hasContent,
      isBooted,
      rootClasses,
      rootStyles,
      transition,
    },
    { slots },
  ) => {
    return (
      <MaybeTransition transition={ transition.value } disabled={ !isBooted.value }>
        <div
          class={ rootClasses.value }
          style={ rootStyles.value }
          v-show={ groupItem.isSelected.value }
        >
          { hasContent.value && slots.default?.() }
        </div>
      </MaybeTransition>
    );
  },
});

export type VWindowItem = InstanceType<typeof VWindowItem>;
