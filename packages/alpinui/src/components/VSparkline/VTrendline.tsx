// Utilities
import { _Trendline } from './VTrendline.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTrendlineSlots } from './VTrendline.base';

export {
  makeVTrendlineProps,
  VTrendlineSlots,
  SparklineItem,
  SparklineText,
  Boundary,
  Point,
} from './VTrendline.base';

export const VTrendline = genericVueComponent<VTrendlineSlots>()({
  ..._Trendline,
  renderHeadless: (
    vm,
    {
      id,
      gradientData,
      hasLabels,
      lineWidth,
      parsedLabels,
      strokeWidth,
      path,
      genPath,
    },
    { props, slots },
  ) => {
    return (
      <svg
        display="block"
        stroke-width={ strokeWidth.value }
      >
        <defs>
          <linearGradient
            id={ id.value }
            gradientUnits="userSpaceOnUse"
            x1={ props.gradientDirection === 'left' ? '100%' : '0' }
            y1={ props.gradientDirection === 'top' ? '100%' : '0' }
            x2={ props.gradientDirection === 'right' ? '100%' : '0' }
            y2={ props.gradientDirection === 'bottom' ? '100%' : '0' }
          >
            {
              gradientData.value.map((color, index) => (
                <stop
                  offset={ index / (Math.max(gradientData.value.length - 1, 1)) }
                  stop-color={ color || 'currentColor' }
                />
              ))
            }
          </linearGradient>
        </defs>

        { hasLabels.value && (
          <g
            key="labels"
            style={{
              textAnchor: 'middle',
              dominantBaseline: 'mathematical',
              fill: 'currentColor',
            }}
          >
            {
              parsedLabels.value.map((item, i) => (
                <text
                  x={ item.x + (lineWidth.value / 2) + lineWidth.value / 2 }
                  y={ (parseInt(props.height, 10) - 4) + (parseInt(props.labelSize, 10) || 7 * 0.75) }
                  font-size={ Number(props.labelSize) || 7 }
                >
                  { slots.label?.({ index: i, value: item.value }) ?? item.value }
                </text>
              ))
            }
          </g>
        )}

        <path
          ref={ path }
          d={ genPath(props.fill) }
          fill={ props.fill ? `url(#${id.value})` : 'none' }
          stroke={ props.fill ? 'none' : `url(#${id.value})` }
        />

        { props.fill && (
          <path
            d={ genPath(false) }
            fill="none"
            stroke={ props.color ?? props.gradient?.[0] }
          />
        )}
      </svg>
    );
  },
});

export type VTrendline = InstanceType<typeof VTrendline>;
