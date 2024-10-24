// Utilities
import { _ProgressCircular } from './VProgressCircular.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VProgressCircularSlots } from './VProgressCircular.base';

export { makeVProgressCircularProps, VProgressCircularSlots } from './VProgressCircular.base';

export const VProgressCircular = genericVueComponent<VProgressCircularSlots>()({
  ..._ProgressCircular,
  renderHeadless: (
    vm,
    {
      diameter,
      normalizedValue,
      root,
      rootClasses,
      rootStyles,
      strokeDashOffset,
      strokeWidth,
      underlayColorClasses,
      underlayColorStyles,
      MAGIC_RADIUS_CONSTANT,
      CIRCUMFERENCE,
    },
    { props, slots },
  ) => {
    return (
      <props.tag
        ref={ root }
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={ props.indeterminate ? undefined : normalizedValue.value }
      >
        <svg
          style={{
            transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={ `0 0 ${diameter.value} ${diameter.value}` }
        >
          <circle
            class={[
              'v-progress-circular__underlay',
              underlayColorClasses.value,
            ]}
            style={ underlayColorStyles.value }
            fill="transparent"
            cx="50%"
            cy="50%"
            r={ MAGIC_RADIUS_CONSTANT }
            stroke-width={ strokeWidth.value }
            stroke-dasharray={ CIRCUMFERENCE }
            stroke-dashoffset={ 0 }
          />

          <circle
            class="v-progress-circular__overlay"
            fill="transparent"
            cx="50%"
            cy="50%"
            r={ MAGIC_RADIUS_CONSTANT }
            stroke-width={ strokeWidth.value }
            stroke-dasharray={ CIRCUMFERENCE }
            stroke-dashoffset={ strokeDashOffset.value }
          />
        </svg>

        { slots.default && (
          <div class="v-progress-circular__content">
            { slots.default({ value: normalizedValue.value }) }
          </div>
        )}
      </props.tag>
    );
  },
});

export type VProgressCircular = InstanceType<typeof VProgressCircular>;
