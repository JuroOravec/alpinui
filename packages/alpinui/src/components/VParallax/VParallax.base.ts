// Styles
import './VParallax.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { useDisplay } from '@/composables/display';
import { useIntersectionObserver } from '@/composables/intersectionObserver';
import { useResizeObserver } from '@/composables/resizeObserver';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getScrollParent } from '@/util/getScrollParent';
import { clamp, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VImg, VImgSlots } from '@/components/VImg/VImg';

function floor(val: number) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}

export const makeVParallaxProps = propsFactory({
  scale: {
    type: [Number, String],
    default: 0.5,
  },

  ...makeComponentProps(),
}, 'VParallax');

export type VParallaxSlots = VImgSlots;

export const _Parallax = defineComponent({
  name: 'VParallax',

  props: makeVParallaxProps(),

  slots: makeSlots<VParallaxSlots>({
    default: null,
    placeholder: null,
    error: null,
    sources: null,
  }),

  setupHeadless(props, vm) {
    const { computed, onBeforeUnmount, ref, watch, watchEffect } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { intersectionRef, isIntersecting } = useIntersectionObserver(vm);
    const { resizeRef, contentRect } = useResizeObserver(vm);
    const { height: displayHeight } = useDisplay(vm);

    const root = ref<VImg>();

    watchEffect(() => {
      intersectionRef.value = resizeRef.value = root.value?.$el;
    });

    let scrollParent: Element | Document;
    watch(isIntersecting, (val) => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value);
        scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
        scrollParent.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else {
        scrollParent.removeEventListener('scroll', onScroll);
      }
    });

    onBeforeUnmount(() => {
      scrollParent?.removeEventListener('scroll', onScroll);
    });

    watch(displayHeight, onScroll);
    watch(() => contentRect.value?.height, onScroll);

    const scale = computed(() => {
      return 1 - clamp(+props.scale);
    });

    let frame = -1;
    function onScroll() {
      if (!isIntersecting.value) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el: HTMLElement | null = (root.value?.$el as Element).querySelector('.v-img__img');
        if (!el) return;

        const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight;
        const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop;
        const top = intersectionRef.value!.getBoundingClientRect().top + scrollPos;
        const height = contentRect.value!.height;

        const center = top + (height - scrollHeight) / 2;
        const translate = floor((scrollPos - center) * scale.value);
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);

        el.style.setProperty('transform', `translateY(${translate}px) scale(${sizeScale})`);
      });
    }

    const rootClasses = computed(() => normalizeClass([
      'v-parallax',
      { 'v-parallax--active': isIntersecting.value },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        root,
        rootClasses,
        rootStyles: styles,
        onScroll,
      },
    };
  },
  renderHeadless: () => null,
});
