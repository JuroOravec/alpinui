// TODO(Alpinui) - DOES THIS WORK AS INTENDED? I DONT KNOW!

// Utilities
import { requestNewFrame } from './requestNewFrame';
import { getScrollParents, hasScrollbar } from '@/util/getScrollParent';
import { IN_BROWSER } from '@/util/globals';
import { convertToUnit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType, Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export interface ScrollStrategyData {
  root: Ref<HTMLElement | undefined>;
  contentEl: Ref<HTMLElement | undefined>;
  targetEl: Ref<HTMLElement | undefined>;
  isActive: Ref<boolean>;
  updateLocation: Ref<((e: Event) => void) | undefined>;
}

type ScrollStrategyFn = (data: ScrollStrategyData, props: StrategyProps) => void

const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy,
};

export interface StrategyProps {
  scrollStrategy: keyof typeof scrollStrategies | ScrollStrategyFn;
  contained: boolean | undefined;
}

export const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function] as PropType<StrategyProps['scrollStrategy']>,
    default: 'block',
    validator: (val: any) => typeof val === 'function' || val in scrollStrategies,
  },
}, 'VOverlay-scroll-strategies');

export function useScrollStrategies(
  vm: HeadlessInstance,
  props: StrategyProps,
  data: ScrollStrategyData
) {
  if (!IN_BROWSER) return;

  const { watchEffect } = vm.reactivity;

  // NOTE(ALpinui): Removed Effect scope
  watchEffect(async() => {
    if (!(data.isActive.value && props.scrollStrategy)) return;

    await new Promise((resolve) => setTimeout(resolve));
    if (typeof props.scrollStrategy === 'function') {
      props.scrollStrategy(data, props);
    } else {
      scrollStrategies[props.scrollStrategy]?.(vm, data, props);
    }
  });
}

function closeScrollStrategy(vm: HeadlessInstance, data: ScrollStrategyData) {
  function onScroll(e: Event) {
    data.isActive.value = false;
  }

  bindScroll(vm, data.targetEl.value ?? data.contentEl.value, onScroll);
}

function blockScrollStrategy(
  vm: HeadlessInstance,
  data: ScrollStrategyData,
  props: StrategyProps,
) {
  const { onBeforeUnmount } = vm.reactivity;

  const offsetParent = data.root.value?.offsetParent;
  const scrollElements = [...new Set([
    ...getScrollParents(data.targetEl.value, props.contained ? offsetParent : undefined),
    ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : undefined),
  ])].filter((el) => !el.classList.contains('v-overlay-scroll-blocked'));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;

  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
  if (scrollableParent) {
    data.root.value!.classList.add('v-overlay--scroll-blocked');
  }

  scrollElements.forEach((el, i) => {
    el.style.setProperty('--v-body-scroll-x', convertToUnit(-el.scrollLeft));
    el.style.setProperty('--v-body-scroll-y', convertToUnit(-el.scrollTop));

    if (el !== document.documentElement) {
      el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth));
    }

    el.classList.add('v-overlay-scroll-blocked');
  });

  onBeforeUnmount(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue('--v-body-scroll-x'));
      const y = parseFloat(el.style.getPropertyValue('--v-body-scroll-y'));

      const scrollBehavior = el.style.scrollBehavior;

      el.style.scrollBehavior = 'auto';
      el.style.removeProperty('--v-body-scroll-x');
      el.style.removeProperty('--v-body-scroll-y');
      el.style.removeProperty('--v-scrollbar-offset');
      el.classList.remove('v-overlay-scroll-blocked');

      el.scrollLeft = -x;
      el.scrollTop = -y;

      el.style.scrollBehavior = scrollBehavior;
    });
    if (scrollableParent) {
      data.root.value!.classList.remove('v-overlay--scroll-blocked');
    }
  });
}

function repositionScrollStrategy(
  vm: HeadlessInstance,
  data: ScrollStrategyData,
  props: StrategyProps,
) {
  const { onBeforeUnmount } = vm.reactivity;

  let slow = false;
  let raf = -1;
  let ric = -1;

  function update(e: Event) {
    requestNewFrame(() => {
      const start = performance.now();
      data.updateLocation.value?.(e);
      const time = performance.now() - start;
      slow = time / (1000 / 60) > 2;
    });
  }

  ric = (typeof requestIdleCallback === 'undefined' ? (cb: Function) => cb() : requestIdleCallback)(() => {
    bindScroll(vm, data.targetEl.value ?? data.contentEl.value, (e) => {
      if (slow) {
        // If the position calculation is slow,
        // defer updates until scrolling is finished.
        // Browsers usually fire one scroll event per frame so
        // we just wait until we've got two frames without an event
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(() => {
            update(e);
          });
        });
      } else {
        update(e);
      }
    });
  });

  onBeforeUnmount(() => {
    typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(ric);
    cancelAnimationFrame(raf);
  });
}

/** @private */
function bindScroll(
  vm: HeadlessInstance,
  el: HTMLElement | undefined,
  onScroll: (e: Event) => void,
) {
  const { onBeforeUnmount } = vm.reactivity;

  const scrollElements = [document, ...getScrollParents(el)];
  scrollElements.forEach((el) => {
    el.addEventListener('scroll', onScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    scrollElements.forEach((el) => {
      el.removeEventListener('scroll', onScroll);
    });
  });
}
