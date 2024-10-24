// Components
import { VFadeTransition } from '@/components/transitions';

// Utilities
import { _DataIterator } from './VDataIterator.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDataIteratorSlots } from './VDataIterator.base';
import { MaybeTransition } from '../MaybeTransition';
import { VLoaderSlot } from '../VLoaderSlot';
import type { GenericProps } from '@/engines/vue';

export { makeVDataIteratorProps, VDataIteratorSlots } from './VDataIterator.base';

const dataIteratorProps = { ..._DataIterator.props };
dataIteratorProps.transition = {
  ..._DataIterator.props.transition,
  default: VFadeTransition,
};

export const VDataIterator = genericVueComponent<new <T> (
  props: {
    items?: readonly T[];
  },
  slots: VDataIteratorSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._DataIterator,
  props: dataIteratorProps,
  renderHeadless: (
    vm,
    { paginatedItems, rootClasses, rootStyles, slotProps },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.header?.(slotProps.value) }

        <MaybeTransition transition={ props.transition }>
          { props.loading ? (
            <VLoaderSlot key="loader" name="v-data-iterator" active>
              { (slotProps) => slots.loader?.(slotProps) }
            </VLoaderSlot>
          ) : (
            <div key="items">
              { !paginatedItems.value.length
                ? slots['no-data']?.()
                : slots.default?.(slotProps.value)
              }
            </div>
          )}
        </MaybeTransition>

        { slots.footer?.(slotProps.value) }
      </props.tag>
    );
  },
});

export type VDataIterator = InstanceType<typeof VDataIterator>;
