// Styles
import './VSlideGroup.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDisplayProps, useDisplay } from '@/composables/display';
import { useGoTo } from '@/composables/goto';
import { makeGroupProps, useGroup } from '@/composables/group';
import { useRtl } from '@/composables/locale';
import { useResizeObserver } from '@/composables/resizeObserver';
import { makeTagProps } from '@/composables/tag';

// Utilities
import {
  calculateCenteredTarget,
  calculateUpdatedTarget,
  getClientSize,
  getOffsetSize,
  getScrollPosition,
  getScrollSize,
} from './helpers';
import { defineComponent } from '@/util/defineComponent';
import { IN_BROWSER } from '@/util/globals';
import { focusableChildren, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { InjectionKey, PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { GoToOptions } from '@/composables/goto';
import type { GroupProvide } from '@/composables/group';

export const VSlideGroupSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-slide-group');

export interface SlideGroupSlot {
  next: GroupProvide['next'];
  prev: GroupProvide['prev'];
  select: GroupProvide['select'];
  isSelected: GroupProvide['isSelected'];
}

export type VSlideGroupSlots = {
  default: SlideGroupSlot;
  prev: SlideGroupSlot;
  next: SlideGroupSlot;
}

export const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol,
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v: any) => (
      typeof v === 'boolean' || [
        'always',
        'desktop',
        'mobile',
      ].includes(v)
    ),
  },

  ...makeComponentProps(),
  ...makeDisplayProps({ mobile: null }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: 'v-slide-group-item--active',
  }),
}, 'VSlideGroup');

export const _SlideGroup = defineComponent({
  name: 'VSlideGroup',

  props: makeVSlideGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VSlideGroupSlots>({
    default: null,
    prev: null,
    next: null,
  }),

  setupHeadless(props, vm) {
    const { computed, shallowRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { isRtl } = useRtl(vm);
    const { displayClasses, mobile } = useDisplay(vm, props);
    const group = useGroup(vm, props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    const contentSize = shallowRef(0);
    const isHorizontal = computed(() => props.direction === 'horizontal');

    const { resizeRef: containerRef, contentRect: containerRect } = useResizeObserver(vm);
    const { resizeRef: contentRef, contentRect } = useResizeObserver(vm);

    const goTo = useGoTo(vm);
    const goToOptions = computed<Partial<GoToOptions>>(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: 'easeOutQuart',
      };
    });

    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;

      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });

    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;

      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });

    if (IN_BROWSER) {
      let frame = -1;
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? 'width' : 'height';

            containerSize.value = containerRect.value[sizeProperty];
            contentSize.value = contentRect.value[sizeProperty];

            isOverflowing.value = containerSize.value + 1 < contentSize.value;
          }

          if (firstSelectedIndex.value >= 0 && contentRef.el) {
            // TODO(Vuetify): Is this too naive? Should we store element references in group composable?
            const selectedElement = contentRef.el.children[lastSelectedIndex.value] as HTMLElement;

            scrollToChildren(selectedElement, props.centerActive);
          }
        });
      });
    }

    const isFocused = shallowRef(false);

    function scrollToChildren(children: HTMLElement, center?: boolean) {
      let target = 0;

      if (center) {
        target = calculateCenteredTarget({
          containerElement: containerRef.el!,
          isHorizontal: isHorizontal.value,
          selectedElement: children,
        });
      } else {
        target = calculateUpdatedTarget({
          containerElement: containerRef.el!,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children,
        });
      }

      scrollToPosition(target);
    }

    function scrollToPosition(newPosition: number) {
      if (!IN_BROWSER || !containerRef.el) return;

      const offsetSize = getOffsetSize(isHorizontal.value, containerRef.el);
      const scrollPosition = getScrollPosition(isHorizontal.value, isRtl.value, containerRef.el);
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);

      if (
        scrollSize <= offsetSize ||
        // Prevent scrolling by only a couple of pixels, which doesn't look smooth
        Math.abs(newPosition - scrollPosition) < 16
      ) return;

      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const { scrollWidth, offsetWidth: containerWidth } = containerRef.el!;

        newPosition = (scrollWidth - containerWidth) - newPosition;
      }

      if (isHorizontal.value) {
        goTo.horizontal(newPosition, goToOptions.value);
      } else {
        goTo(newPosition, goToOptions.value);
      }
    }

    function onScroll(e: Event) {
      const { scrollTop, scrollLeft } = e.target as HTMLElement;

      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }

    function onFocusin(e: FocusEvent) {
      isFocused.value = true;

      if (!isOverflowing.value || !contentRef.el) return;

      // Focused element is likely to be the root of an item, so a
      // breadth-first search will probably find it in the first iteration
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item as HTMLElement);
            return;
          }
        }
      }
    }

    function onFocusout(e: FocusEvent) {
      isFocused.value = false;
    }

    // Affix clicks produce onFocus that we have to ignore to avoid extra scrollToChildren
    let ignoreFocusEvent = false;
    function onFocus(e: FocusEvent) {
      if (
        !ignoreFocusEvent &&
        !isFocused.value &&
        !(e.relatedTarget && contentRef.el?.contains(e.relatedTarget as Node))
      ) focus();

      ignoreFocusEvent = false;
    }

    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }

    function onKeydown(e: KeyboardEvent) {
      if (!contentRef.el) return;

      function toFocus(location: Parameters<typeof focus>[0]) {
        e.preventDefault();
        focus(location);
      }

      if (isHorizontal.value) {
        if (e.key === 'ArrowRight') {
          toFocus(isRtl.value ? 'prev' : 'next');
        } else if (e.key === 'ArrowLeft') {
          toFocus(isRtl.value ? 'next' : 'prev');
        }
      } else {
        if (e.key === 'ArrowDown') {
          toFocus('next');
        } else if (e.key === 'ArrowUp') {
          toFocus('prev');
        }
      }

      if (e.key === 'Home') {
        toFocus('first');
      } else if (e.key === 'End') {
        toFocus('last');
      }
    }

    function focus(location?: 'next' | 'prev' | 'first' | 'last') {
      if (!contentRef.el) return;

      let el: HTMLElement | undefined;

      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === 'next') {
        el = contentRef.el.querySelector(':focus')?.nextElementSibling as HTMLElement | undefined;

        if (!el) return focus('first');
      } else if (location === 'prev') {
        el = contentRef.el.querySelector(':focus')?.previousElementSibling as HTMLElement | undefined;

        if (!el) return focus('last');
      } else if (location === 'first') {
        el = (contentRef.el.firstElementChild as HTMLElement);
      } else if (location === 'last') {
        el = (contentRef.el.lastElementChild as HTMLElement);
      }

      if (el) {
        el.focus({ preventScroll: true });
      }
    }

    function scrollTo(location: 'prev' | 'next') {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;

      const offsetStep = (location === 'prev' ? -direction : direction) * containerSize.value;

      let newPosition = scrollOffset.value + offsetStep;

      // TODO(Vuetify): improve it
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const { scrollWidth, offsetWidth: containerWidth } = containerRef.el!;

        newPosition += scrollWidth - containerWidth;
      }

      scrollToPosition(newPosition);
    }

    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected,
    }));

    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case 'always': return true;

        // Always show arrows on desktop
        case 'desktop': return !mobile.value;

        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true: return isOverflowing.value || Math.abs(scrollOffset.value) > 0;

        // Always show on mobile
        case 'mobile': return (
          mobile.value ||
          (isOverflowing.value || Math.abs(scrollOffset.value) > 0)
        );

        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default: return (
          !mobile.value &&
          (isOverflowing.value || Math.abs(scrollOffset.value) > 0)
        );
      }
    });

    const hasPrev = computed(() => {
      // 1 pixel in reserve, may be lost after rounding
      return Math.abs(scrollOffset.value) > 1;
    });

    const hasNext = computed(() => {
      if (!containerRef.value) return false;

      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);

      const scrollSizeMax = scrollSize - clientSize;

      // 1 pixel in reserve, may be lost after rounding
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-slide-group',
      {
        'v-slide-group--vertical': !isHorizontal.value,
        'v-slide-group--has-affixes': hasAffixes.value,
        'v-slide-group--is-overflowing': isOverflowing.value,
      },
      displayClasses.value,
      classes.value,
    ]));

    const rootTabIndex = computed(() => (isFocused.value || group.selected.value.length) ? -1 : 0);

    const prevClasses = computed(() => normalizeClass([
      'v-slide-group__prev',
      { 'v-slide-group__prev--disabled': !hasPrev.value },
    ]));

    const onPrevClick = () => hasPrev.value && scrollTo('prev');

    const nextClasses = computed(() => normalizeClass([
      'v-slide-group__next',
      { 'v-slide-group__next--disabled': !hasNext.value },
    ]));

    const onNextClick = () => hasNext.value && scrollTo('next');

    return {
      expose: {
        selected: group.selected,
        scrollTo,
        scrollOffset,
        focus,
      },
      renderInput: {
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
        rootStyles: styles,
        rootTabIndex,
        slotProps,
      },
    };
  },
  renderHeadless: () => null,
});
