// Styles
import './VSlider.sass';

// Components
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';

// Composables
import { makeSliderProps, useSlider, useSteps } from './slider';
import { useComponent } from '@/composables/component';
import { makeFocusProps, useFocus } from '@/composables/focus';
import { useRtl } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VSliderThumbSlots } from './VSliderThumb.base';
import type { VSliderTrackSlots } from './VSliderTrack.base';
import type { VInputSlot, VInputSlots } from '@/components/VInput/VInput';

export type VSliderSlots = VInputSlots & VSliderThumbSlots & VSliderTrackSlots & {
  label: VInputSlot;
}

export const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),

  modelValue: {
    type: [Number, String],
    default: 0,
  },
}, 'VSlider');

export const _Slider = defineComponent({
  name: 'VSlider',

  props: makeVSliderProps(),

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (v: number) => true,
    start: (value: number) => true,
    end: (value: number) => true,
  },

  slots: makeSlots<VSliderSlots>({
    label: null,
    default: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
    'thumb-label': null,
    'tick-label': null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref } = vm.reactivity;

    const thumbContainerRef = ref();
    const { classes, styles } = useComponent(vm, props);
    const { rtlClasses } = useRtl(vm);

    const steps = useSteps(vm, props);

    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      undefined,
      (value) => {
        return steps.roundValue(value == null ? steps.min.value : value);
      },
    );

    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly,
    } = useSlider(vm, {
      props,
      steps,
      onSliderStart: () => {
        vm.emit('start', model.value);
      },
      onSliderEnd: ({ value }) => {
        const roundedValue = roundValue(value);
        model.value = roundedValue;
        vm.emit('end', roundedValue);
      },
      onSliderMove: ({ value }) => model.value = roundValue(value),
      getActiveThumb: () => thumbContainerRef.value?.$el,
    });

    const { isFocused, focus, blur } = useFocus(vm, props);
    const trackStop = computed(() => position(model.value));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => _Input.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-slider',
      {
        'v-slider--has-labels': vm.hasSlots['tick-label'] || hasLabels.value,
        'v-slider--focused': isFocused.value,
        'v-slider--pressed': mousePressed.value,
        'v-slider--disabled': !!props.disabled,
      },
      rtlClasses.value,
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
        inputProps,
        isFocused,
        min,
        max,
        model,
        readonly,
        trackContainerRef,
        thumbContainerRef,
        trackStop,
        onSliderMousedown,
        onSliderTouchstart,
        focus,
        blur,
      },
    };
  },
  renderHeadless: () => null,
});
