// Components
import { _Img, makeVImgProps } from '@/components/VImg/VImg.base';
import { _WindowItem, makeVWindowItemProps } from '@/components/VWindow/VWindowItem.base';

// Composables
import { useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VImgSlots } from '@/components/VImg/VImg';

export const makeVCarouselItemProps = propsFactory({
  ...makeVImgProps(),
  ...makeVWindowItemProps(),
}, 'VCarouselItem');

export type VCarouselItemSlots = VImgSlots;

export const _CarouselItem = defineComponent({
  name: 'VCarouselItem',

  inheritAttrs: false,

  props: makeVCarouselItemProps(),

  slots: makeSlots<VImgSlots>({
    default: null,
    placeholder: null,
    error: null,
    sources: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const imgProps = computed(() => _Img.filterProps(props));
    const windowItemProps = computed(() => _WindowItem.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-carousel-item',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        imgProps,
        rootClasses,
        rootStyles: styles,
        windowItemProps,
      },
    };
  },
  renderHeadless: () => null,
});
