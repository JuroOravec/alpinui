// Components
import { VIcon } from '@/components/VIcon';

// Utilities
import { _ColorPickerSwatches } from './VColorPickerSwatches.base';
import { defineVueComponent } from '@/engines/vue';
import {
  getContrast,
  parseColor,
  RGBtoCSS,
  RGBtoHSV,
} from '@/util/colorUtils';
import { deepEqual } from '@/util/helpers';

export { makeVColorPickerSwatchesProps, VColorPickerSwatchesSlots } from './VColorPickerSwatches.base';

export const VColorPickerSwatches = defineVueComponent({
  ..._ColorPickerSwatches,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <div>
          { props.swatches.map((swatch) => (
            <div class="v-color-picker-swatches__swatch">
              { swatch.map((color) => {
                const rgba = parseColor(color);
                const hsva = RGBtoHSV(rgba);
                const background = RGBtoCSS(rgba);

                return (
                  <div
                    class="v-color-picker-swatches__color"
                    onClick={ () => hsva && vm.emit('update:color', hsva) }
                  >
                    <div style={{ background }}>
                      { props.color && deepEqual(props.color, hsva)
                        ? (
                          <VIcon
                            size="x-small"
                            icon="$success"
                            color={ getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black' }
                          />
                        )
                        : undefined
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
});

export type VColorPickerSwatches = InstanceType<typeof VColorPickerSwatches>;
