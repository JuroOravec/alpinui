// Styles
import './VInfiniteScroll.sass';

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { useIntersectionObserver } from '@/composables/intersectionObserver';
import { useLocale } from '@/composables/locale';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export type InfiniteScrollSide = 'start' | 'end' | 'both'
export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'

type InfiniteScrollSlot = {
  side: InfiniteScrollSide;
  props: Record<string, any>;
}

export type VInfiniteScrollIntersectSlots = {
  /** Empty */
}

export type VInfiniteScrollSlots = {
  default: never;
  loading: InfiniteScrollSlot;
  error: InfiniteScrollSlot;
  empty: InfiniteScrollSlot;
  'load-more': InfiniteScrollSlot;
}

export const makeVInfiniteScrollProps = propsFactory({
  color: String,
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
    validator: (v: any) => ['vertical', 'horizontal'].includes(v),
  },
  side: {
    type: String as PropType<InfiniteScrollSide>,
    default: 'end',
    validator: (v: any) => ['start', 'end', 'both'].includes(v),
  },
  mode: {
    type: String as PropType<'intersect' | 'manual'>,
    default: 'intersect',
    validator: (v: any) => ['intersect', 'manual'].includes(v),
  },
  margin: [Number, String],
  loadMoreText: {
    type: String,
    default: '$vuetify.infiniteScroll.loadMore',
  },
  emptyText: {
    type: String,
    default: '$vuetify.infiniteScroll.empty',
  },

  ...makeDimensionProps(),
  ...makeTagProps(),
}, 'VInfiniteScroll');

export const _InfiniteScrollIntersect = defineComponent({
  name: 'VInfiniteScrollIntersect',

  props: {
    side: {
      type: String as PropType<InfiniteScrollSide>,
      required: true,
    },
    rootRef: null,
    rootMargin: String,
  },

  emits: {
    intersect: (side: InfiniteScrollSide, isIntersecting: boolean) => true,
  },

  slots: makeSlots<VInfiniteScrollIntersectSlots>(null),

  setupHeadless(props, vm) {
    const { watch } = vm.reactivity;

    const { intersectionRef, isIntersecting } = useIntersectionObserver(vm, (entries) => {
    }, props.rootMargin ? {
      rootMargin: props.rootMargin,
    } : undefined);

    watch(isIntersecting, async(val) => {
      vm.emit('intersect', props.side, val);
    });

    return {
      expose: {},
      renderInput: {
        intersectionRef,
      },
    };
  },
  renderHeadless: () => null,
});

export const _InfiniteScroll = defineComponent({
  name: 'VInfiniteScroll',

  props: makeVInfiniteScrollProps(),

  emits: {
    load: (options: { side: InfiniteScrollSide, done: (status: InfiniteScrollStatus) => void }) => true,
  },

  slots: makeSlots<VInfiniteScrollSlots>({
    default: null,
    loading: null,
    error: null,
    empty: null,
    'load-more': null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, onMounted, ref, shallowRef } = vm.reactivity;

    const { dimensionStyles } = useDimension(vm, props);
    const { t } = useLocale(vm);

    const rootEl = ref<HTMLDivElement>();
    const startStatus = shallowRef<InfiniteScrollStatus>('ok');
    const endStatus = shallowRef<InfiniteScrollStatus>('ok');
    const margin = computed(() => convertToUnit(props.margin));
    const isIntersecting = shallowRef(false);

    function setScrollAmount(amount: number) {
      if (!rootEl.value) return;

      const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      rootEl.value[property] = amount;
    }

    function getScrollAmount() {
      if (!rootEl.value) return 0;

      const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      return rootEl.value[property];
    }

    function getScrollSize() {
      if (!rootEl.value) return 0;

      const property = props.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
      return rootEl.value[property];
    }

    function getContainerSize() {
      if (!rootEl.value) return 0;

      const property = props.direction === 'vertical' ? 'clientHeight' : 'clientWidth';
      return rootEl.value[property];
    }

    onMounted(() => {
      if (!rootEl.value) return;

      if (props.side === 'start') {
        setScrollAmount(getScrollSize());
      } else if (props.side === 'both') {
        setScrollAmount(getScrollSize() / 2 - getContainerSize() / 2);
      }
    });

    function setStatus(side: InfiniteScrollSide, status: InfiniteScrollStatus) {
      if (side === 'start') {
        startStatus.value = status;
      } else if (side === 'end') {
        endStatus.value = status;
      }
    }

    function getStatus(side: string) {
      return side === 'start' ? startStatus.value : endStatus.value;
    }

    let previousScrollSize = 0;
    function handleIntersect(side: InfiniteScrollSide, _isIntersecting: boolean) {
      isIntersecting.value = _isIntersecting;
      if (isIntersecting.value) {
        intersecting(side);
      }
    }

    function intersecting(side: InfiniteScrollSide) {
      if (props.mode !== 'manual' && !isIntersecting.value) return;

      const status = getStatus(side);
      if (!rootEl.value || ['empty', 'loading'].includes(status)) return;

      previousScrollSize = getScrollSize();
      setStatus(side, 'loading');

      function done(status: InfiniteScrollStatus) {
        setStatus(side, status);

        nextTick(() => {
          if (status === 'empty' || status === 'error') return;

          if (status === 'ok' && side === 'start') {
            setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount());
          }
          if (props.mode !== 'manual') {
            nextTick(() => {
              window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    intersecting(side);
                  });
                });
              });
            });
          }
        });
      }

      vm.emit('load', { side, done });
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const hasStartIntersect = computed(() => props.side === 'start' || props.side === 'both');
    const hasEndIntersect = computed(() => props.side === 'end' || props.side === 'both');
    const intersectMode = computed(() => props.mode === 'intersect');

    const shouldRenderStartIntersect = computed(() => rootEl.value && hasStartIntersect.value && intersectMode.value);
    const shouldRenderEndIntersect = computed(() => rootEl.value && hasEndIntersect.value && intersectMode.value);

    const loadMoreText = computed(() => t(props.loadMoreText));
    const emptyText = computed(() => t(props.emptyText));

    const rootClasses = computed(() => normalizeClass([
      'v-infinite-scroll',
      `v-infinite-scroll--${props.direction}`,
      {
        'v-infinite-scroll--start': hasStartIntersect.value,
        'v-infinite-scroll--end': hasEndIntersect.value,
      },
    ]));

    return {
      expose: {},
      renderInput: {
        shouldRenderStartIntersect,
        shouldRenderEndIntersect,
        dimensionStyles,
        loadMoreText,
        emptyText,
        margin,
        rootClasses,
        rootEl,
        startStatus,
        endStatus,
        handleIntersect,
        intersecting,
      },
    };
  },
  renderHeadless: () => null,
});
