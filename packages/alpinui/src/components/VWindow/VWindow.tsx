// Components
import { VBtn } from '@/components/VBtn/VBtn';

// Directives
import { Touch } from '@/directives/touch';

// Utilities
import { _Window } from './VWindow.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VWindowSlots } from './VWindow.base';
import type { GenericProps } from '@/engines/vue';

export { makeVWindowProps, VWindowSlots, VWindowGroupSymbol, VWindowSymbol } from './VWindow.base';

export const VWindow = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VWindowSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Window,

  directives: { Touch },

  renderHeadless: (
    vm,
    {
      containerStyles,
      group,
      rootRef,
      rootClasses,
      rootStyles,
      touchOptions,
      prevProps,
      nextProps,
      canMoveForward,
      canMoveBack,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        ref={ rootRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-touch={ touchOptions.value }
      >
        <div
          class="v-window__container"
          style={ containerStyles.value }
        >
          { slots.default?.({ group }) }

          { props.showArrows !== false && (
            <div class="v-window__controls">
              { canMoveBack.value
                ? slots.prev
                  ? slots.prev({ props: prevProps.value })
                  : <VBtn { ...prevProps.value } />
                : <div key="" /> }

              { canMoveForward.value
                ? slots.next
                  ? slots.next({ props: nextProps.value })
                  : <VBtn { ...nextProps.value } />
                : <div /> }
            </div>
          )}
        </div>

        { slots.additional?.({ group }) }
      </props.tag>
    );
  },
});

export type VWindow = InstanceType<typeof VWindow>;
