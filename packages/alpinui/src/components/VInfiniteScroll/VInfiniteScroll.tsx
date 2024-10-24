// Components
import { VBtn } from '@/components/VBtn';
import { VProgressCircular } from '@/components/VProgressCircular';

// Utilities
import { _InfiniteScroll, _InfiniteScrollIntersect } from './VInfiniteScroll.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { InfiniteScrollSide, InfiniteScrollStatus, VInfiniteScrollIntersectSlots, VInfiniteScrollSlots } from './VInfiniteScroll.base';

export {
  makeVInfiniteScrollProps,
  VInfiniteScrollSlots,
  VInfiniteScrollIntersectSlots,
  InfiniteScrollSide,
  InfiniteScrollStatus,
} from './VInfiniteScroll.base';

export const VInfiniteScrollIntersect = genericVueComponent<VInfiniteScrollIntersectSlots>()({
  ..._InfiniteScrollIntersect,
  renderHeadless: (
    vm,
    { intersectionRef },
    { slots },
  ) => {
    return (
      <div class="v-infinite-scroll-intersect" ref={ intersectionRef }>&nbsp;</div>
    );
  },
});

export type VVInfiniteScrollIntersect = InstanceType<typeof VInfiniteScrollIntersect>;

export const VInfiniteScroll = genericVueComponent<VInfiniteScrollSlots>()({
  ..._InfiniteScroll,
  renderHeadless: (
    vm,
    {
      dimensionStyles,
      shouldRenderStartIntersect,
      shouldRenderEndIntersect,
      emptyText,
      loadMoreText,
      margin,
      rootClasses,
      rootEl,
      startStatus,
      endStatus,
      handleIntersect,
      intersecting,
    },
    { props, slots },
  ) => {
    function renderSide(side: InfiniteScrollSide, status: InfiniteScrollStatus) {
      if (props.side !== side && props.side !== 'both') return;

      const onClick = () => intersecting(side);
      const slotProps = { side, props: { onClick, color: props.color } };

      if (status === 'error') return slots.error?.(slotProps);

      if (status === 'empty') return slots.empty?.(slotProps) ?? <div>{ emptyText.value }</div>;

      if (props.mode === 'manual') {
        if (status === 'loading') {
          return slots.loading?.(slotProps) ?? (
            <VProgressCircular indeterminate color={ props.color } />
          );
        }

        return slots['load-more']?.(slotProps) ?? (
          <VBtn variant="outlined" color={ props.color } onClick={ onClick }>
            { loadMoreText.value }
          </VBtn>
        );
      }

      return slots.loading?.(slotProps) ?? (
        <VProgressCircular indeterminate color={ props.color } />
      );
    }

    const Tag = props.tag;

    return (
      <Tag
        ref={ rootEl }
        class={ rootClasses.value }
        style={ dimensionStyles.value }
      >
        <div class="v-infinite-scroll__side">
          { renderSide('start', startStatus.value) }
        </div>

        { /* TODO(Alpinui): Render this with x-show  */ }
        { shouldRenderStartIntersect.value && (
          <VInfiniteScrollIntersect
            key="start"
            side="start"
            onIntersect={ handleIntersect }
            rootRef={ rootEl.value }
            rootMargin={ margin.value }
          />
        )}

        { slots.default?.() }

        { shouldRenderEndIntersect.value && (
          <VInfiniteScrollIntersect
            key="end"
            side="end"
            onIntersect={ handleIntersect }
            rootRef={ rootEl.value }
            rootMargin={ margin.value }
          />
        )}

        <div class="v-infinite-scroll__side">
          { renderSide('end', endStatus.value) }
        </div>
      </Tag>
    );
  },
});

export type VInfiniteScroll = InstanceType<typeof VInfiniteScroll>;
