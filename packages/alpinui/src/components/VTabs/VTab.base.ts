// Styles
import './VTab.sass';

// Components
import { _Btn, makeVBtnProps } from '@/components/VBtn/VBtn.base';

// Composables
import { useTextColor } from '@/composables/color';
import { useComponent } from '@/composables/component';
import { forwardRefs } from '@/composables/forwardRefs';

// Utilities
import { animate } from '@/util/animation';
import { defineComponent } from '@/util/defineComponent';
import { standardEasing } from '@/util/easing';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VBtn, VBtnSlots } from '@/components/VBtn/VBtn';

export const makeVTabProps = propsFactory({
  fixed: Boolean,

  sliderColor: String,
  hideSlider: Boolean,

  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  ...omit(makeVBtnProps({
    selectedClass: 'v-tab--selected',
    variant: 'text' as const,
  }), [
    'active',
    'block',
    'flat',
    'location',
    'position',
    'symbol',
  ]),
}, 'VTab');

export type VTabSlots = VBtnSlots;

export const _Tab = defineComponent({
  name: 'VTab',

  props: makeVTabProps(),

  slots: makeSlots<VTabSlots>({
    default: null,
    prepend: null,
    append: null,
    loader: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { textColorClasses: sliderColorClasses, textColorStyles: sliderColorStyles } = useTextColor(vm, props, 'sliderColor');

    const rootEl = ref<VBtn>();
    const sliderEl = ref<HTMLElement>();

    const isHorizontal = computed(() => props.direction === 'horizontal');
    const isSelected = computed(() => rootEl.value?.group?.isSelected.value ?? false);

    function updateSlider({ value }: { value: boolean }) {
      if (value) {
        const prevEl: HTMLElement | undefined = rootEl.value?.$el.parentElement?.querySelector('.v-tab--selected .v-tab__slider');
        const nextEl = sliderEl.value;

        if (!prevEl || !nextEl) return;

        const color = getComputedStyle(prevEl).color;

        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();

        const xy = isHorizontal.value ? 'x' : 'y';
        const XY = isHorizontal.value ? 'X' : 'Y';
        const rightBottom = isHorizontal.value ? 'right' : 'bottom';
        const widthHeight = isHorizontal.value ? 'width' : 'height';

        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos
          ? prevBox[rightBottom] - nextBox[rightBottom]
          : prevBox[xy] - nextBox[xy];
        const origin =
          Math.sign(delta) > 0 ? (isHorizontal.value ? 'right' : 'bottom')
          : Math.sign(delta) < 0 ? (isHorizontal.value ? 'left' : 'top')
          : 'center';
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;

        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, 'currentcolor'],
          transform: [
            `translate${XY}(${delta}px) scale${XY}(${initialScale})`,
            `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`,
            'none',
          ],
          transformOrigin: Array(3).fill(origin),
        }, {
          duration: 225,
          easing: standardEasing,
        });
      }
    }

    const btnProps = computed(() => _Btn.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-tab',
      classes.value,
    ]));

    const sliderClasses = computed(() => normalizeClass([
      'v-tab__slider',
      sliderColorClasses.value,
    ]));

    return {
      expose: forwardRefs({}, rootEl),
      renderInput: {
        btnProps,
        isSelected,
        sliderEl,
        sliderClasses,
        sliderColorStyles,
        rootEl,
        rootClasses,
        rootStyles: styles,
        updateSlider,
      },
    };
  },
  renderHeadless: () => null,
});
