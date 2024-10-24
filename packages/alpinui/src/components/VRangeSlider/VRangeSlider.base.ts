// Styles
import '../VSlider/VSlider.sass';

// Components
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';
import { getOffset, makeSliderProps, useSlider, useSteps } from '@/components/VSlider/slider';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeFocusProps, useFocus } from '@/composables/focus';
import { useRtl } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType, WritableComputedRef } from 'vue';
import type { VInput } from '../VInput/VInput';
import type { VSliderSlots } from '../VSlider/VSlider';
import type { VSliderThumb } from '@/components/VSlider/VSliderThumb';

export const makeVRangeSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeVInputProps(),
  ...makeSliderProps(),
  ...makeComponentProps(),

  strict: Boolean,
  modelValue: {
    type: Array as PropType<readonly (string | number)[]>,
    default: () => ([0, 0]),
  },
}, 'VRangeSlider');

export type VRangeSliderSlots = VSliderSlots;

export const _RangeSlider = defineComponent({
  name: 'VRangeSlider',

  props: makeVRangeSliderProps(),

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (value: [number, number]) => true,
    end: (value: [number, number]) => true,
    start: (value: [number, number]) => true,
  },

  slots: makeSlots<VRangeSliderSlots>({
    default: null,
    label: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
    'thumb-label': null,
    'tick-label': null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const startThumbRef = ref<VSliderThumb>();
    const stopThumbRef = ref<VSliderThumb>();
    const inputRef = ref<VInput>();
    const { rtlClasses } = useRtl(vm);

    function getActiveThumb(e: MouseEvent | TouchEvent) {
      if (!startThumbRef.value || !stopThumbRef.value) return;

      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);

      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);

      return (a < b || (a === b && startOffset < 0)) ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }

    const steps = useSteps(vm, props);

    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      undefined,
      (arr) => {
        if (!arr?.length) return [0, 0];

        return arr.map((value) => steps.roundValue(value));
      },
    ) as WritableComputedRef<[number, number]> & { readonly externalValue: number[] };

    const {
      activeThumbRef,
      hasLabels,
      max,
      min,
      mousePressed,
      onSliderMousedown,
      onSliderTouchstart,
      position,
      trackContainerRef,
      readonly,
    } = useSlider(vm, {
      props,
      steps,
      onSliderStart: () => {
        vm.emit('start', model.value);
      },
      onSliderEnd: ({ value }) => {
        const newValue: [number, number] = activeThumbRef.value === startThumbRef.value?.$el
          ? [value, model.value[1]]
          : [model.value[0], value];

        if (!props.strict && newValue[0] < newValue[1]) {
          model.value = newValue;
        }

        vm.emit('end', model.value);
      },
      onSliderMove: ({ value }) => {
        const [start, stop] = model.value;

        if (!props.strict && start === stop && start !== min.value) {
          activeThumbRef.value = value > start ? stopThumbRef.value?.$el : startThumbRef.value?.$el;
          activeThumbRef.value?.focus();
        }

        if (activeThumbRef.value === startThumbRef.value?.$el) {
          model.value = [Math.min(value, stop), stop];
        } else {
          model.value = [start, Math.max(start, value)];
        }
      },
      getActiveThumb,
    });

    const { isFocused, focus, blur } = useFocus(vm, props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => _Input.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-slider',
      'v-range-slider',
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
        isFocused,
        model,
        min,
        max,
        readonly,
        inputRef,
        inputProps,
        rootClasses,
        rootStyles: styles,
        trackContainerRef,
        trackStart,
        trackStop,
        startThumbRef,
        stopThumbRef,
        activeThumbRef,
        onSliderMousedown,
        onSliderTouchstart,
        blur,
        focus,
      },
    };
  },
  renderHeadless: () => null,
});
