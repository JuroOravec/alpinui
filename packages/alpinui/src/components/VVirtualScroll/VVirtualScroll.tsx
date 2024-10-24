// Components
import { VVirtualScrollItem } from './VVirtualScrollItem';

// Utilities
import { _VirtualScroll } from './VVirtualScroll.base';
import { genericVueComponent } from '@/engines/vue';
import { convertToUnit } from '@/util/helpers';

// Types
import type { VVirtualScrollSlots } from './VVirtualScroll.base';
import type { Slots } from '@/engines/types';

export { makeVVirtualScrollProps, VVirtualScrollSlots } from './VVirtualScroll.base';

// NOTE(Alpinui): Couldn't get the slots/props typing right..
export const VVirtualScroll = genericVueComponent<VVirtualScrollSlots>()({
  ..._VirtualScroll,
  slots: _VirtualScroll.slots as Slots<VVirtualScrollSlots>,
  renderHeadless: (
    vm,
    {
      computedItems,
      containerRef,
      markerRef,
      markerStyles,
      paddingBottom,
      paddingTop,
      scrollClasses,
      scrollStyles,
      handleItemResize,
      handleScroll,
      handleScrollend,
    },
    { props, slots },
  ) => {
    const children = computedItems.value.map((item) => (
      <VVirtualScrollItem
        key={ item.index }
        renderless={ props.renderless }
        onUpdate:height={ (height) => handleItemResize(item.index, height) }
      >
        { (slotProps) => slots.default?.({ item: item.raw, index: item.index, ...slotProps }) }
      </VVirtualScrollItem>
    ));

    return props.renderless ? (
      <>
        <div ref={ markerRef } class="v-virtual-scroll__spacer" style={{ paddingTop: convertToUnit(paddingTop.value) }} />
        { children }
        <div class="v-virtual-scroll__spacer" style={{ paddingBottom: convertToUnit(paddingBottom.value) }} />
      </>
    ) : (
      <div
        ref={ containerRef }
        class={ scrollClasses.value }
        onScrollPassive={ handleScroll }
        onScrollend={ handleScrollend }
        style={ scrollStyles.value }
      >
        <div
          ref={ markerRef }
          class="v-virtual-scroll__container"
          style={ markerStyles.value }
        >
          { children }
        </div>
      </div>
    );
  },
});

export type VVirtualScroll = InstanceType<typeof VVirtualScroll>;
