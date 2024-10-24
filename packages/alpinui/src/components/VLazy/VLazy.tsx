// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';

// Directives
import { Intersect } from '@/directives/intersect';

// Utilities
import { _Lazy } from './VLazy.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VLazySlots } from './VLazy.base';

export { makeVLazyProps, VLazySlots } from './VLazy.base';

export const VLazy = genericVueComponent<VLazySlots>()({
  ..._Lazy,

  directives: { Intersect },

  renderHeadless: (
    vm,
    { isActive, onIntersect, rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        v-intersect={[
          {
            handler: onIntersect,
            options: props.options,
          },
          null,
          isActive.value ? [] : ['once'],
        ]}
        style={ rootStyles.value }
      >
        { isActive.value && (
          <MaybeTransition transition={ props.transition } appear>
            { slots.default?.() }
          </MaybeTransition>
        )}
      </props.tag>
    );
  },
});

export type VLazy = InstanceType<typeof VLazy>;
