// Components
import { VImg } from '@/components/VImg/VImg';
import { VWindowItem } from '@/components/VWindow/VWindowItem';

// Utilities
import { _CarouselItem } from './VCarouselItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCarouselItemSlots } from './VCarouselItem.base';

export { makeVCarouselItemProps, VCarouselItemSlots } from './VCarouselItem.base';

export const VCarouselItem = genericVueComponent<VCarouselItemSlots>()({
  ..._CarouselItem,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles, imgProps, windowItemProps },
    { slots, attrs },
  ) => {
    return (
      <VWindowItem
        class={ rootClasses.value }
        styles={ rootStyles.value }
        { ...windowItemProps }
      >
        <VImg
          { ...attrs }
          { ...imgProps.value }
          v-slots={ slots }
        />
      </VWindowItem>
    );
  },
});

export type VCarouselItem = InstanceType<typeof VCarouselItem>;
