// Components
import { VSliderThumb } from './VSliderThumb';
import { VSliderTrack } from './VSliderTrack';
import { VInput } from '@/components/VInput/VInput';
import { VLabel } from '@/components/VLabel';

// Utilities
import { _Slider } from './VSlider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSliderSlots } from './VSlider.base';

export { makeVSliderProps, VSliderSlots } from './VSlider.base';

export const VSlider = genericVueComponent<VSliderSlots>()({
  ..._Slider,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
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
    { props, slots },
  ) => {
    const hasPrepend = !!(props.label || slots.label || slots.prepend);

    return (
      <VInput
        class={ rootClasses.value }
        style={ rootStyles.value }
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
                      id={ slotProps.id.value }
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
                id={ id.value }
                name={ props.name || id.value }
                disabled={ !!props.disabled }
                readonly={ !!props.readonly }
                tabindex="-1"
                value={ model.value }
              />

              <VSliderTrack
                ref={ trackContainerRef }
                start={ 0 }
                stop={ trackStop.value }
              >
                {{ 'tick-label': slots['tick-label'] }}
              </VSliderTrack>

              <VSliderThumb
                ref={ thumbContainerRef }
                aria-describedby={ messagesId.value }
                focused={ isFocused.value }
                min={ min.value }
                max={ max.value }
                modelValue={ model.value }
                onUpdate:modelValue={ (v) => (model.value = v) }
                position={ trackStop.value }
                elevation={ props.elevation }
                onFocus={ focus }
                onBlur={ blur }
                ripple={ props.ripple }
                name={ props.name }
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

export type VSlider = InstanceType<typeof VSlider>;
