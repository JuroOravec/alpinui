// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VSlideYTransition } from '@/components/transitions';

// Utilities
import { _Messages } from './VMessages.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VMessagesSlots } from './VMessages.base';

export { makeVMessagesProps, VMessagesSlots, VMessageSlot } from './VMessages.base';

const messagesProps = { ..._Messages.props };
messagesProps.transition = { ..._Messages.props.transition, default: VSlideYTransition };

export const VMessages = genericVueComponent<VMessagesSlots>()({
  ..._Messages,
  props: messagesProps,
  renderHeadless: (
    vm,
    { messages, rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <MaybeTransition
        transition={ props.transition }
        tag="div"
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="alert"
        aria-live="polite"
      >
        { props.active && (
          messages.value.map((message, i) => (
            <div
              class="v-messages__message"
              key={ `${i}-${messages.value}` }
            >
              { slots.message ? slots.message({ message }) : message }
            </div>
          ))
        )}
      </MaybeTransition>
    );
  },
});

export type VMessages = InstanceType<typeof VMessages>;
