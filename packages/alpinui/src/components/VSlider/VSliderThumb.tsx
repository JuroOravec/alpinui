// Components
import { VScaleTransition } from '../transitions';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _SliderThumb } from './VSliderThumb.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSliderThumbSlots } from './VSliderThumb.base';

export { makeVSliderThumbProps, VSliderThumbSlots } from './VSliderThumb.base';

export const VSliderThumb = genericVueComponent<VSliderThumbSlots>()({
  ..._SliderThumb,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      direction,
      disabled,
      readonly,
      onKeydown,
      rootClasses,
      rootStyles,
      thumbSurfaceClasses,
      thumbRippleClasses,
      thumbLabel,
      defaultThumbLabel,
      textColorStyles,
    },
    { props, slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="slider"
        tabindex={ disabled.value ? -1 : 0 }
        aria-label={ props.name }
        aria-valuemin={ props.min }
        aria-valuemax={ props.max }
        aria-valuenow={ props.modelValue }
        aria-readonly={ !!readonly.value }
        aria-orientation={ direction.value }
        onKeydown={ !readonly.value ? onKeydown : undefined }
      >
        <div
          class={ thumbSurfaceClasses.value }
          style={ textColorStyles.value }
        />
        <div
          class={ thumbRippleClasses.value }
          style={ textColorStyles.value }
          v-ripple={[props.ripple, null, ['circle', 'center']]}
        />
        <VScaleTransition origin="bottom center">
          <div
            class="v-slider-thumb__label-container"
            v-show={ (thumbLabel.value && props.focused) || thumbLabel.value === 'always' }
          >
            <div class="v-slider-thumb__label">
              <div>
                { slots['thumb-label']?.({ modelValue: props.modelValue }) ?? defaultThumbLabel.value }
              </div>
            </div>
          </div>
        </VScaleTransition>
      </div>
    );
  },
});

export type VSliderThumb = InstanceType<typeof VSliderThumb>;
