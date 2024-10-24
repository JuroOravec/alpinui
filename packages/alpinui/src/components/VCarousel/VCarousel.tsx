// Components
import { VWindow } from '@/components/VWindow/VWindow';

// Utilities
import { _Carousel } from './VCarousel.base';
import { VCarouselControls } from './VCarouselControls';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCarouselSlots } from './VCarousel.base';
import type { GroupProvide } from '@/composables/group';
import type { GenericProps } from '@/engines/vue';

export { makeVCarouselProps, VCarouselSlots } from './VCarousel.base';

export const VCarousel = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VCarouselSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Carousel,
  renderHeadless: (
    vm,
    {
      windowClasses,
      windowProps,
      windowRef,
      windowStyles,
      model,
      controlsProps,
    },
    { slots },
  ) => {
    return (
      <VWindow
        ref={ windowRef }
        { ...windowProps.value }
        v-model={ model.value }
        class={ windowClasses.value }
        style={ windowStyles.value }
      >
        {{
          default: slots.default,
          additional: ({ group }: { group: GroupProvide }) => (
            <VCarouselControls
              { ...controlsProps.value }
              group={ group }
              v-slots:item={ slots.item }
            />
          ),
          prev: slots.prev,
          next: slots.next,
        }}
      </VWindow>
    );
  },
});

export type VCarousel = InstanceType<typeof VCarousel>;
