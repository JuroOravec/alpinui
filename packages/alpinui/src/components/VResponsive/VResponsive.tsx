// Utilities
import { _Responsive } from './VResponsive.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VResponsiveSlots } from './VResponsive.base';

export { makeVResponsiveProps, VResponsiveSlots } from './VResponsive.base';

export const VResponsive = genericVueComponent<VResponsiveSlots>()({
  ..._Responsive,
  renderHeadless: (
    vm,
    {
      aspectStyles,
      contentClasses,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <div class="v-responsive__sizer" style={ aspectStyles.value } />

        { slots.additional?.() }

        { slots.default && (
          <div class={ contentClasses.value }>{ slots.default() }</div>
        )}
      </div>
    );
  },
});

export type VResponsive = InstanceType<typeof VResponsive>;
