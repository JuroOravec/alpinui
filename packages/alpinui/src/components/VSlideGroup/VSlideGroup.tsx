// Components
import { VFadeTransition } from '@/components/transitions';
import { VIcon } from '@/components/VIcon';

// Utilities
import { _SlideGroup } from './VSlideGroup.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSlideGroupSlots } from './VSlideGroup.base';
import type { GenericProps } from '@/engines/vue';

export { makeVSlideGroupProps, VSlideGroupSlots, VSlideGroupSymbol, SlideGroupSlot } from './VSlideGroup.base';

export const VSlideGroup = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VSlideGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._SlideGroup,
  renderHeadless: (
    vm,
    {
      hasAffixes,
      isRtl,
      onFocus,
      onFocusAffixes,
      onFocusin,
      onFocusout,
      onScroll,
      onKeydown,
      onNextClick,
      onPrevClick,
      containerRef,
      contentRef,
      prevClasses,
      nextClasses,
      rootClasses,
      rootStyles,
      rootTabIndex,
      slotProps,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        tabindex={ rootTabIndex.value }
        onFocus={ onFocus }
      >
        { hasAffixes.value && (
          <div
            key="prev"
            class={ prevClasses.value }
            onMousedown={ onFocusAffixes }
            onClick={ onPrevClick }
          >
            { slots.prev?.(slotProps.value) ?? (
              <VFadeTransition>
                <VIcon icon={ isRtl.value ? props.nextIcon : props.prevIcon }></VIcon>
              </VFadeTransition>
            )}
          </div>
        )}

        <div
          key="container"
          ref={ containerRef }
          class="v-slide-group__container"
          onScroll={ onScroll }
        >
          <div
            ref={ contentRef }
            class="v-slide-group__content"
            onFocusin={ onFocusin }
            onFocusout={ onFocusout }
            onKeydown={ onKeydown }
          >
            { slots.default?.(slotProps.value) }
          </div>
        </div>

        { hasAffixes.value && (
          <div
            key="next"
            class={ nextClasses.value }
            onMousedown={ onFocusAffixes }
            onClick={ onNextClick }
          >
            { slots.next?.(slotProps.value) ?? (
              <VFadeTransition>
                <VIcon icon={ isRtl.value ? props.prevIcon : props.nextIcon }></VIcon>
              </VFadeTransition>
            )}
          </div>
        )}
      </props.tag>
    );
  },
});

export type VSlideGroup = InstanceType<typeof VSlideGroup>;
