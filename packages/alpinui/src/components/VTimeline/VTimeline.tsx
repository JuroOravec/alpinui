// Utilities
import { _Timeline } from './VTimeline.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTimelineSlots } from './VTimeline.base';
import type { Slots } from '@/engines/types';

export {
  makeVTimelineProps,
  VTimelineSlots,
  TimelineAlign,
  TimelineDirection,
  TimelineSide,
  TimelineTruncateLine,
} from './VTimeline.base';

export const VTimeline = genericVueComponent<VTimelineSlots>()({
  ..._Timeline,
  slots: _Timeline.slots as Slots<VTimelineSlots>,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VTimeline = InstanceType<typeof VTimeline>;
