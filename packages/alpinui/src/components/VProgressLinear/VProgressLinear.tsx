// Utilities
import { Transition } from 'vue';
import { _ProgressLinear } from './VProgressLinear.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VProgressLinearSlots } from './VProgressLinear.base';

export { makeVProgressLinearProps, VProgressLinearSlots } from './VProgressLinear.base';

export const VProgressLinear = genericVueComponent<VProgressLinearSlots>()({
  ..._ProgressLinear,
  renderHeadless: (
    vm,
    {
      barColorStyles,
      intersectionRef,
      normalizedBuffer,
      normalizedValue,
      handleClick,
      transition,
      rootClasses,
      rootStyles,
      streamClasses,
      streamStyles,
      bgClasses,
      bgStyles,
      bufferClasses,
      bufferStyles,
      determinateClasses,
      determinateStyles,
      indeterminateClasses,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        ref={ intersectionRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="progressbar"
        aria-hidden={ props.active ? 'false' : 'true' }
        aria-valuemin="0"
        aria-valuemax={ props.max }
        aria-valuenow={ props.indeterminate ? undefined : normalizedValue.value }
        onClick={ props.clickable && handleClick }
      >
        { props.stream && (
          <div
            key="stream"
            class={ streamClasses.value }
            style={ streamStyles.value }
          />
        )}

        <div
          class={ bgClasses.value }
          style={ bgStyles.value }
        />

        <div
          class={ bufferClasses.value }
          style={ bufferStyles.value }
        />

        <Transition name={ transition.value }>
          { !props.indeterminate ? (
            <div
              class={ determinateClasses.value }
              style={ determinateStyles.value }
            />
          ) : (
            <div class="v-progress-linear__indeterminate">
              {['long', 'short'].map((bar) => (
                <div
                  key={ bar }
                  class={[
                    indeterminateClasses.value,
                    bar,
                  ]}
                  style={ barColorStyles.value }
                />
              ))}
            </div>
          )}
        </Transition>

        { slots.default && (
          <div class="v-progress-linear__content">
            { slots.default({ value: normalizedValue.value, buffer: normalizedBuffer.value }) }
          </div>
        )}
      </props.tag>
    );
  },
});

export type VProgressLinear = InstanceType<typeof VProgressLinear>;
