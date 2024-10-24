// Styles
import './VCarousel.sass';

// Components
import { _Window, makeVWindowProps } from '@/components/VWindow/VWindow.base';

// Composables
import { useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { _CarouselControls } from './VCarouselControls.base';
import { IconValue } from '../VIcon/icons.base';
import type { VWindow, VWindowSlots } from '@/components/VWindow/VWindow';

export const makeVCarouselProps = propsFactory({
  color: String,
  cycle: Boolean,
  delimiterIcon: {
    type: IconValue,
    default: '$delimiter',
  },
  height: {
    type: [Number, String],
    default: 500,
  },
  hideDelimiters: Boolean,
  hideDelimiterBackground: Boolean,
  interval: {
    type: [Number, String],
    default: 6000,
    validator: (value: string | number) => Number(value) > 0,
  },
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String] as PropType<boolean | 'left' | 'right'>,

  ...makeVWindowProps({
    continuous: true,
    mandatory: 'force' as const,
    showArrows: true,
  }),
}, 'VCarousel');

export type VCarouselSlots = VWindowSlots & {
  item: {
    props: Record<string, any>;
    item: {
      id: number;
      value: unknown;
      disabled: boolean | undefined;
    };
  };
}

export const _Carousel = defineComponent({
  name: 'VCarousel',

  props: makeVCarouselProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VCarouselSlots>({
    item: null,
    default: null,
    additional: null,
    prev: null,
    next: null,
  }),

  setupHeadless(props, vm) {
    const { computed, onMounted, ref, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const windowRef = ref<VWindow>();

    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, (val) => {
      if (val) restartTimeout();
      else window.clearTimeout(slideTimeout);
    });

    onMounted(startTimeout);

    function startTimeout() {
      if (!props.cycle || !windowRef.value) return;

      slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000);
    }

    function restartTimeout() {
      window.clearTimeout(slideTimeout);
      window.requestAnimationFrame(startTimeout);
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const windowProps = computed(() => _Window.filterProps(props));

    const windowClasses = computed(() => normalizeClass([
      'v-carousel',
      {
        'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
        'v-carousel--vertical-delimiters': !!props.verticalDelimiters,
      },
      classes.value,
    ]));

    const windowStyles = computed(() => normalizeStyle([
      { height: convertToUnit(props.height) },
      styles.value,
    ]));

    const controlsProps = computed(() => _CarouselControls.filterProps(props));

    return {
      expose: {},
      renderInput: {
        windowClasses,
        windowProps,
        windowRef,
        windowStyles,
        model,
        controlsProps,
      },
    };
  },
  renderHeadless: () => null,
});
