// Components
import { VBtn } from '@/components/VBtn';
import { VSlider } from '@/components/VSlider';

// Utilities
import { _ColorPickerPreview } from './VColorPickerPreview.base';
import { defineVueComponent } from '@/engines/vue';
import { HSVtoCSS } from '@/util/colorUtils';

export { makeVColorPickerPreviewProps, VColorPickerPreviewSlots } from './VColorPickerPreview.base';

export const VColorPickerPreview = defineVueComponent({
  ..._ColorPickerPreview,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles, openEyeDropper, nullColor, SUPPORTS_EYE_DROPPER },
    { props },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { SUPPORTS_EYE_DROPPER && (
          <div class="v-color-picker-preview__eye-dropper" key="eyeDropper">
            <VBtn onClick={ openEyeDropper } icon="$eyeDropper" variant="plain" density="comfortable" />
          </div>
        )}

        <div class="v-color-picker-preview__dot">
          <div style={{ background: HSVtoCSS(props.color ?? nullColor) }} />
        </div>

        <div class="v-color-picker-preview__sliders">
          <VSlider
            class="v-color-picker-preview__track v-color-picker-preview__hue"
            modelValue={ props.color?.h }
            onUpdate:modelValue={ (h: number) => vm.emit('update:color', { ...(props.color ?? nullColor), h }) }
            step={ 0 }
            min={ 0 }
            max={ 360 }
            disabled={ props.disabled }
            thumbSize={ 14 }
            trackSize={ 8 }
            trackFillColor="white"
            hideDetails
          />

          { !props.hideAlpha && (
            <VSlider
              class="v-color-picker-preview__track v-color-picker-preview__alpha"
              modelValue={ props.color?.a ?? 1 }
              onUpdate:modelValue={ (a: number) => vm.emit('update:color', { ...(props.color ?? nullColor), a }) }
              step={ 1 / 256 }
              min={ 0 }
              max={ 1 }
              disabled={ props.disabled }
              thumbSize={ 14 }
              trackSize={ 8 }
              trackFillColor="white"
              hideDetails
            />
          )}
        </div>
      </div>
    );
  },
});

export type VColorPickerPreview = InstanceType<typeof VColorPickerPreview>;
