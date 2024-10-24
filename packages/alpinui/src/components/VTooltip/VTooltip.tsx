// Components
import { VOverlay } from '@/components/VOverlay';

// Utilities
import { _Tooltip } from './VTooltip.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTooltipSlots } from './VTooltip.base';

export { makeVTooltipProps, VTooltipSlots } from './VTooltip.base';

export const VTooltip = genericVueComponent<VTooltipSlots>()({
  ..._Tooltip,
  renderHeadless: (
    vm,
    {
      id,
      isActive,
      location,
      origin,
      scopeId,
      transition,
      activatorProps,
      overlay,
      overlayProps,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <VOverlay
        ref={ overlay }
        class={ rootClasses.value }
        style={ rootStyles.value }
        id={ id.value }
        { ...overlayProps.value }
        v-model={ isActive.value }
        transition={ transition.value }
        absolute
        location={ location.value }
        origin={ origin.value }
        persistent
        role="tooltip"
        activatorProps={ activatorProps.value }
        _disableGlobalStack
        { ...scopeId }
      >
        {{
          activator: slots.activator,
          default: (...args) => slots.default?.(...args) ?? props.text,
        }}
      </VOverlay>
    );
  },
});

export type VTooltip = InstanceType<typeof VTooltip>;
