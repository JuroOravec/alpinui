// Utilities
import { _Barline } from './VBarline.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBarlineSlots } from './VBarline.base';

export {
  makeVBarlineProps,
  VBarlineSlots,
  SparklineItem,
  SparklineText,
  Bar,
  Boundary,
} from './VBarline.base';

export const VBarline = genericVueComponent<VBarlineSlots>()({
  ..._Barline,
  renderHeadless: (
    vm,
    {
      bars,
      parsedLabels,
      gradientData,
      id,
      offsetX,
      lineWidth,
      duration,
      hasLabels,
    },
    { props, slots },
  ) => {
    return (
      <svg
        display="block"
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
                <stop offset={ index / (Math.max(gradientData.value.length - 1, 1)) } stop-color={ color || 'currentColor' } />
              ))
            }
          </linearGradient>
        </defs>

        <clipPath id={ `${id.value}-clip` }>
          {
            bars.value.map((item) => (
              <rect
                  x={ item.x + offsetX.value }
                  y={ item.y }
                  width={ lineWidth.value }
                  height={ item.height }
                  rx={ typeof props.smooth === 'number' ? props.smooth : props.smooth ? 2 : 0 }
                  ry={ typeof props.smooth === 'number' ? props.smooth : props.smooth ? 2 : 0 }
              >
                { props.autoDraw && (
                  <>
                    <animate
                      attributeName="y"
                      from={ item.y + item.height }
                      to={ item.y }
                      dur={ duration.value }
                      fill="freeze"
                    />
                    <animate
                      attributeName="height"
                      from="0"
                      to={ item.height }
                      dur={ duration.value }
                      fill="freeze"
                    />
                  </>
                )}
              </rect>
            ))
          }
        </clipPath>

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
                  x={ item.x + offsetX.value + lineWidth.value / 2 }
                  y={ (parseInt(props.height, 10) - 2) + (parseInt(props.labelSize, 10) || 7 * 0.75) }
                  font-size={ Number(props.labelSize) || 7 }
                >
                  { slots.label?.({ index: i, value: item.value }) ?? item.value }
                </text>
              ))
            }
          </g>
        )}

        <g
          clip-path={ `url(#${id.value}-clip)` }
          fill={ `url(#${id.value})` }
        >
          <rect
            x={ 0 }
            y={ 0 }
            width={ Math.max(props.modelValue.length * lineWidth.value, Number(props.width)) }
            height={ props.height }
          ></rect>
        </g>
      </svg>
    );
  },
});

export type VBarline = InstanceType<typeof VBarline>;
