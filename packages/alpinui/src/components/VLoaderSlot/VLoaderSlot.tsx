// Components
import { VProgressLinear } from '@/components/VProgressLinear';

// Utilities
import { _LoaderSlot } from './VLoaderSlot.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VLoaderSlotSlots } from './VLoaderSlot.base';

export { makeVLoaderSlotProps, VLoaderSlotSlots, LoaderSlotProps } from './VLoaderSlot.base';

export const VLoaderSlot = genericVueComponent<VLoaderSlotSlots>()({
  ..._LoaderSlot,
  renderHeadless: (
    vm,
    _,
    { props, slots },
  ) => {
    return (
      <div class={ `${props.name}__loader` }>
        { slots.default?.({
          color: props.color,
          isActive: props.active,
        }) || (
            <VProgressLinear
              absolute={ props.absolute }
              active={ props.active }
              color={ props.color }
              height="2"
              indeterminate
            />
        )}
      </div>
    );
  },
});

export type VLoaderSlot = InstanceType<typeof VLoaderSlot>;
