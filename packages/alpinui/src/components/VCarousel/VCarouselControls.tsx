// Components
import { VBtn } from '@/components/VBtn';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VProgressLinear } from '@/components/VProgressLinear';

// Utilities
import { _CarouselControls } from './VCarouselControls.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCarouselControlsSlots } from './VCarouselControls.base';

export { makeVCarouselControlsProps, VCarouselControlsSlots } from './VCarouselControls.base';

export const VCarouselControls = genericVueComponent<VCarouselControlsSlots>()({
  ..._CarouselControls,
  renderHeadless: (
    vm,
    {
      itemDefaults,
      itemsLength,
      controlsStyles,
      genControlsItemProps,
      progressColor,
      progressValue,
    },
    { props, slots },
  ) => {
    return (
      <>
        { !props.hideDelimiters && (
          <div
            class="v-carousel__controls"
            style={ controlsStyles.value }
          >
            { itemsLength.value > 0 && (
              <VDefaultsProvider
                defaults={ itemDefaults.value }
                scoped
              >
                { props.group.items.value.map((item, index) => {
                  const itemProps = genControlsItemProps(item, index);
                  return slots.item
                    ? slots.item({ props: itemProps, item })
                    : (<VBtn { ...item } { ...itemProps } />);
                })}
              </VDefaultsProvider>
            )}
          </div>
        )}

        { props.progress && (
          <VProgressLinear
            class="v-carousel__progress"
            color={ progressColor.value }
            modelValue={ progressValue.value }
          />
        )}
      </>
    );
  },
});

export type VCarouselControls = InstanceType<typeof VCarouselControls>;
