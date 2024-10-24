// Utilities
import { _SliderTrack } from './VSliderTrack.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSliderTrackSlots } from './VSliderTrack.base';

export { makeVSliderTrackProps, VSliderTrackSlots } from './VSliderTrack.base';

export const VSliderTrack = genericVueComponent<VSliderTrackSlots>()({
  ..._SliderTrack,
  renderHeadless: (
    vm,
    {
      min,
      max,
      startDir,
      ticks,
      showTicks,
      getTickDirection,
      backgroundClasses,
      backgroundStyles,
      rootClasses,
      rootStyles,
      trackFillClasses,
      trackFillStyles,
    },
    { props, slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <div
          class={ backgroundClasses.value }
          style={ backgroundStyles.value }
        />
        <div
          class={ trackFillClasses.value }
          style={ trackFillStyles.value }
        />

        { showTicks.value && (
          <div
            class={[
              'v-slider-track__ticks',
              {
                'v-slider-track__ticks--always-show': showTicks.value === 'always',
              },
            ]}
          >
            { ticks.value.map((tick, index) => (
              <div
                key={ tick.value }
                class={[
                  'v-slider-track__tick',
                  {
                    'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
                    'v-slider-track__tick--first': tick.value === min.value,
                    'v-slider-track__tick--last': tick.value === max.value,
                  },
                ]}
                style={{ [startDir.value]: getTickDirection(tick) }}
              >
                {
                  (tick.label || slots['tick-label']) && (
                    <div class="v-slider-track__tick-label">
                      { slots['tick-label']?.({ tick, index }) ?? tick.label }
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});

export type VSliderTrack = InstanceType<typeof VSliderTrack>;
