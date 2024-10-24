// Styles
import './VImg.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';
import { _Responsive, makeVResponsiveProps } from '@/components/VResponsive/VResponsive.base';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeRoundedProps, useRounded } from '@/composables/rounded';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { SUPPORTS_INTERSECTION } from '@/util/globals';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src?: string;
  srcset?: string;
  lazySrc?: string;
  aspect: number;
}

export type VImgSlots = {
  default: never;
  placeholder: never;
  error: never;
  sources: never;
}

export const makeVImgProps = propsFactory({
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String] as PropType<boolean | 'true' | 'false'>,
    default: undefined,
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object as PropType<IntersectionObserverInit>,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: undefined,
      rootMargin: undefined,
      threshold: undefined,
    }),
  },
  sizes: String,
  src: {
    type: [String, Object] as PropType<string | srcObject>,
    default: '',
  },
  crossorigin: String as PropType<'' | 'anonymous' | 'use-credentials'>,
  referrerpolicy: String as PropType<
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,
  srcset: String,
  position: String,

  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTransitionProps(),
}, 'VImg');

export const _Img = defineComponent({
  name: 'VImg',

  props: makeVImgProps(),

  slots: makeSlots<VImgSlots>({
    default: null,
    placeholder: null,
    error: null,
    sources: null,
  }),

  emits: {
    loadstart: (value: string | undefined) => true,
    load: (value: string | undefined) => true,
    error: (value: string | undefined) => true,
  },

  setupHeadless(props, vm) {
    const {
      computed,
      nextTick,
      onBeforeMount,
      onBeforeUnmount,
      ref,
      shallowRef,
      toRef,
      watch,
    } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { roundedClasses } = useRounded(vm, props);

    const currentSrc = shallowRef(''); // Set from srcset
    const image = ref<HTMLImageElement>();
    const state = shallowRef<'idle' | 'loading' | 'loaded' | 'error'>(props.eager ? 'loading' : 'idle');
    const naturalWidth = shallowRef<number>();
    const naturalHeight = shallowRef<number>();

    const normalisedSrc = computed<srcObject>(() => {
      return props.src && typeof props.src === 'object'
        ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect || 0),
        } : {
          src: props.src,
          srcset: props.srcset,
          lazySrc: props.lazySrc,
          aspect: Number(props.aspectRatio || 0),
        };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value! / naturalHeight.value! || 0;
    });

    watch(() => props.src, () => {
      init(state.value !== 'idle');
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });

    // TODO(Vuetify): getSrc when window width changes

    onBeforeMount(() => init());

    function init(isIntersecting?: boolean) {
      if (props.eager && isIntersecting) return;
      if (
        SUPPORTS_INTERSECTION &&
        !isIntersecting &&
        !props.eager
      ) return;

      state.value = 'loading';

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }

      if (!normalisedSrc.value.src) return;

      nextTick(() => {
        vm.emit('loadstart', image.value?.currentSrc || normalisedSrc.value.src);

        setTimeout(() => {
          if (vm.isUnmounted) return;

          if (image.value?.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }

            if (state.value === 'error') return;

            if (!aspectRatio.value) pollForSize(image.value, null);
            if (state.value === 'loading') onLoad();
          } else {
            if (!aspectRatio.value) pollForSize(image.value!);
            getSrc();
          }
        });
      });
    }

    function onLoad() {
      if (vm.isUnmounted) return;

      getSrc();
      pollForSize(image.value!);
      state.value = 'loaded';
      vm.emit('load', image.value?.currentSrc || normalisedSrc.value.src);
    }

    function onError() {
      if (vm.isUnmounted) return;

      state.value = 'error';
      vm.emit('error', image.value?.currentSrc || normalisedSrc.value.src);
    }

    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }

    let timer = -1;

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    function pollForSize(img: HTMLImageElement, timeout: number | null = 100) {
      const poll = () => {
        clearTimeout(timer);
        if (vm.isUnmounted) return;

        const { naturalHeight: imgHeight, naturalWidth: imgWidth } = img;

        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          timer = window.setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };

      poll();
    }

    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          // Doesn't work with nextTick, idk why
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const containClasses = computed(() => normalizeClass({
      'v-img__img--cover': props.cover,
      'v-img__img--contain': !props.cover,
    }));

    const responsiveProps = computed(() => _Responsive.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-img',
      { 'v-img--booting': !isBooted.value },
      backgroundColorClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      { width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width) },
      backgroundColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {
        currentSrc,
        image,
        state,
        naturalWidth,
        naturalHeight,
      },
      renderInput: {
        aspectRatio,
        image,
        containClasses,
        normalisedSrc,
        responsiveProps,
        rootClasses,
        rootStyles,
        state,
        init,
        onLoad,
        onError,
      },
    };
  },
  renderHeadless: () => null,
});
