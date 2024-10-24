// Components
import { VListGroupActivator } from './VListGroupActivator';
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VExpandTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';

// Utilities
import { _ListGroup } from './VListGroup.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListGroupSlots } from './VListGroup.base';

export { makeVListGroupProps, VListGroupSlots } from './VListGroup.base';

export const VListGroup = genericVueComponent<VListGroupSlots>()({
  ..._ListGroup,
  renderHeadless: (
    vm,
    {
      id,
      isBooted,
      isOpen,
      activatorDefaults,
      activatorProps,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.activator && (
          <VDefaultsProvider defaults={ activatorDefaults.value }>
            <VListGroupActivator>
              { slots.activator({ props: activatorProps.value, isOpen: isOpen.value }) }
            </VListGroupActivator>
          </VDefaultsProvider>
        )}

        <MaybeTransition transition={{ component: VExpandTransition }} disabled={ !isBooted.value }>
          <div class="v-list-group__items" role="group" aria-labelledby={ id.value } v-show={ isOpen.value }>
            { slots.default?.() }
          </div>
        </MaybeTransition>
      </props.tag>
    );
  },
});

export type VListGroup = InstanceType<typeof VListGroup>;
