// Components
import { VInput } from '@/components/VInput/VInput';
import { VLabel } from '@/components/VLabel/VLabel';
import { VSliderThumb } from '@/components/VSlider/VSliderThumb';
import { VSliderTrack } from '@/components/VSlider/VSliderTrack';

// Utilities
import { _RangeSlider } from './VRangeSlider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VRangeSliderSlots } from './VRangeSlider.base';

export { makeVRangeSliderProps, VRangeSliderSlots } from './VRangeSlider.base';

export const VRangeSlider = genericVueComponent<VRangeSliderSlots>()({
  ..._RangeSlider,
  renderHeadless: (
    vm,
    {
      isFocused,
      model,
      min,
      max,
      readonly,
      inputRef,
      inputProps,
      rootClasses,
      rootStyles,
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
    { props, slots },
  ) => {
    const hasPrepend = !!(props.label || slots.label || slots.prepend);

    return (
      <VInput
        class={ rootClasses.value }
        style={ rootStyles.value }
        ref={ inputRef }
        { ...inputProps.value }
        focused={ isFocused.value }
      >
        {{
          ...slots,
          prepend: hasPrepend ? (slotProps) => (
            <>
              { slots.label?.(slotProps) ?? (
                props.label
                  ? (
                    <VLabel
                      class="v-slider__label"
                      text={ props.label }
                    />
                  ) : undefined
              )}

              { slots.prepend?.(slotProps) }
            </>
          ) : undefined,
          default: ({ id, messagesId }) => (
            <div
              class="v-slider__container"
              onMousedown={ !readonly.value ? onSliderMousedown : undefined }
              onTouchstartPassive={ !readonly.value ? onSliderTouchstart : undefined }
            >
              <input
                id={ `${id.value}_start` }
                name={ props.name || id.value }
                disabled={ !!props.disabled }
                readonly={ !!props.readonly }
                tabindex="-1"
                value={ model.value[0] }
              />

              <input
                id={ `${id.value}_stop` }
                name={ props.name || id.value }
                disabled={ !!props.disabled }
                readonly={ !!props.readonly }
                tabindex="-1"
                value={ model.value[1] }
              />

              <VSliderTrack
                ref={ trackContainerRef }
                start={ trackStart.value }
                stop={ trackStop.value }
              >
                {{ 'tick-label': slots['tick-label'] }}
              </VSliderTrack>

              <VSliderThumb
                ref={ startThumbRef }
                aria-describedby={ messagesId.value }
                focused={ isFocused && activeThumbRef.value === startThumbRef.value?.$el }
                modelValue={ model.value[0] }
                onUpdate:modelValue={ (v) => (model.value = [v, model.value[1]]) }
                onFocus={ (e: FocusEvent) => {
                  focus();
                  activeThumbRef.value = startThumbRef.value?.$el;

                  // Make sure second thumb is focused if
                  // the thumbs are on top of each other
                  // and they are both at minimum value
                  // but only if focused from outside.
                  if (
                    model.value[0] === model.value[1] &&
                    model.value[1] === min.value &&
                    e.relatedTarget !== stopThumbRef.value?.$el
                  ) {
                    startThumbRef.value?.$el.blur();
                    stopThumbRef.value?.$el.focus();
                  }
                }}
                onBlur={ () => {
                  blur();
                  activeThumbRef.value = undefined;
                }}
                min={ min.value }
                max={ model.value[1] }
                position={ trackStart.value }
                ripple={ props.ripple }
              >
                {{ 'thumb-label': slots['thumb-label'] }}
              </VSliderThumb>

              <VSliderThumb
                ref={ stopThumbRef }
                aria-describedby={ messagesId.value }
                focused={ isFocused && activeThumbRef.value === stopThumbRef.value?.$el }
                modelValue={ model.value[1] }
                onUpdate:modelValue={ (v) => (model.value = [model.value[0], v]) }
                onFocus={ (e: FocusEvent) => {
                  focus();
                  activeThumbRef.value = stopThumbRef.value?.$el;

                  // Make sure first thumb is focused if
                  // the thumbs are on top of each other
                  // and they are both at maximum value
                  // but only if focused from outside.
                  if (
                    model.value[0] === model.value[1] &&
                    model.value[0] === max.value &&
                    e.relatedTarget !== startThumbRef.value?.$el
                  ) {
                    stopThumbRef.value?.$el.blur();
                    startThumbRef.value?.$el.focus();
                  }
                }}
                onBlur={ () => {
                  blur();
                  activeThumbRef.value = undefined;
                }}
                min={ model.value[0] }
                max={ max.value }
                position={ trackStop.value }
                ripple={ props.ripple }
              >
                {{ 'thumb-label': slots['thumb-label'] }}
              </VSliderThumb>
            </div>
          ),
        }}
      </VInput>
    );
  },
});

export type VRangeSlider = InstanceType<typeof VRangeSlider>;
