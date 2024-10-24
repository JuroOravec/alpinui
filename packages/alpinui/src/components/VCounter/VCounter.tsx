// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VSlideYTransition } from '@/components/transitions';

// Utilities
import { _Counter } from './VCounter.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCounterSlots } from './VCounter.base';

export { makeVCounterProps, VCounterSlots, VCounterSlot } from './VCounter.base';

// NOTE(Alpinui): We have to set the default component here, so we don't
// import Vue stuff into the `VDialog.base` file.
const counterProps = { ..._Counter.props };
counterProps.transition = { ...counterProps.transition, default: VSlideYTransition };

export const VCounter = genericVueComponent<VCounterSlots>()({
  ..._Counter,
  props: counterProps,
  renderHeadless: (
    vm,
    { counter, rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <MaybeTransition transition={ props.transition }>
        <div
          v-show={ props.active }
          class={ rootClasses.value }
          style={ rootStyles.value }
        >
          { slots.default
            ? slots.default({
              counter: counter.value,
              max: props.max,
              value: props.value,
            })
            : counter.value
          }
        </div>
      </MaybeTransition>
    );
  },
});

export type VCounter = InstanceType<typeof VCounter>;
