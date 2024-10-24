// Styles
import './VVirtualScroll.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeVirtualProps, useVirtual } from '@/composables/virtual';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getScrollParent } from '@/util/getScrollParent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType } from 'vue';
import type { RawSlots, Slots } from '@/engines/types';
import type { TemplateRef } from '@/util/helpers';

export interface VVirtualScrollSlot<T> {
  item: T;
  index: number;
}

// NOTE(Alpinui): Removed the conditional type
//                Also used `TemplateRef` instead of `Ref<HTMLElement>`
export interface VVirtualScrollSlots extends RawSlots {
  default: VVirtualScrollSlot<any> & {
    itemRef?: TemplateRef;
  };
}

export const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array as PropType<readonly unknown[]>,
    default: () => ([]),
  },
  renderless: Boolean,

  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VVirtualScroll');

export const _VirtualScroll = defineComponent({
  name: 'VVirtualScroll',

  props: makeVVirtualScrollProps(),

  slots: {} as Slots<VVirtualScrollSlots>,

  setupHeadless(props, vm) {
    const { computed, onMounted, ref, toRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const {
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems,
    } = useVirtual(vm, props, toRef(props, 'items'));

    function handleListeners(add = false) {
      const method = add ? 'addEventListener' : 'removeEventListener';

      if (containerRef.value === document.documentElement) {
        document[method]('scroll', handleScroll, { passive: true });
        document[method]('scrollend', handleScrollend);
      } else {
        containerRef.value?.[method]('scroll', handleScroll, { passive: true });
        containerRef.value?.[method]('scrollend', handleScrollend);
      }
    }

    // NOTE(Alpinui): Replaced `useToggleScope`
    const isMounted = ref(false);
    const areListenersSet = ref(false);

    onMounted(() => (isMounted.value = true));

    watch(
      [
        () => props.renderless,
        isMounted,
      ],
      () => {
        if (!isMounted.value) return;

        // NOTE(Alpinui): This block was previously inside `onMounted`
        if (props.renderless && !areListenersSet.value) {
          containerRef.value = getScrollParent(vm.el, true);
          handleListeners(true);
          areListenersSet.value = true;
        } else if (!props.renderless && areListenersSet.value) {
          // NOTE(Alpinui): This block was previously inside `onScopeDispose`
          handleListeners();
        }
      },
    );

    const scrollClasses = computed(() => normalizeClass([
      'v-virtual-scroll',
      classes.value,
    ]));

    const scrollStyles = computed(() => normalizeStyle([
      dimensionStyles.value,
      styles.value,
    ]));

    const markerStyles = computed(() => normalizeStyle({
      paddingTop: convertToUnit(paddingTop.value),
      paddingBottom: convertToUnit(paddingBottom.value),
    }));

    return {
      expose: {
        scrollToIndex,
      },
      renderInput: {
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
    };
  },
  renderHeadless: () => null,
});
