// Utilities
import { _Divider } from './VDivider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDividerSlots } from './VDivider.base';

export { makeVDividerProps, VDividerSlots } from './VDivider.base';

export const VDivider = genericVueComponent<VDividerSlots>()({
  ..._Divider,
  renderHeadless: (
    vm,
    { hrProps, wrapperProps },
    { slots },
  ) => {
    const divider = (
      <hr class="v-divider" { ...hrProps.value } />
    );

    if (!slots.default) return divider;

    return (
      <div class="v-divider__wrapper" { ...wrapperProps.value }>
        { divider }

        <div class="v-divider__content">
          { slots.default() }
        </div>

        { divider }
      </div>
    );
  },
});

export type VDivider = InstanceType<typeof VDivider>;
