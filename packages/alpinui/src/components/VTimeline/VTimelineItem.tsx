// Components
import { VTimelineDivider } from './VTimelineDivider';

// Utilities
import { _TimelineItem } from './VTimelineItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTimelineItemSlots } from './VTimelineItem.base';

export { makeVTimelineItemProps, VTimelineItemSlots } from './VTimelineItem.base';

export const VTimelineItem = genericVueComponent<VTimelineItemSlots>()({
  ..._TimelineItem,
  renderHeadless: (
    vm,
    {
      dotRef,
      dimensionStyles,
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
        <div
          class="v-timeline-item__body"
          style={ dimensionStyles.value }
        >
          { slots.default?.() }
        </div>

        <VTimelineDivider
          ref={ dotRef }
          hideDot={ props.hideDot }
          icon={ props.icon }
          iconColor={ props.iconColor }
          size={ props.size }
          elevation={ props.elevation }
          dotColor={ props.dotColor }
          fillDot={ props.fillDot }
          rounded={ props.rounded }
          v-slots={{ default: (...args) => slots.icon?.(...args) }}
        />

        { props.density !== 'compact' && (
          <div class="v-timeline-item__opposite">
            { !props.hideOpposite && slots.opposite?.() }
          </div>
        )}
      </div>
    );
  },
});

export type VTimelineItem = InstanceType<typeof VTimelineItem>;
