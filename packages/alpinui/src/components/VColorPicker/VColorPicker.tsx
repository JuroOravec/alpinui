// Components
import { VColorPickerCanvas } from './VColorPickerCanvas';
import { VColorPickerEdit } from './VColorPickerEdit';
import { VColorPickerPreview } from './VColorPickerPreview';
import { VColorPickerSwatches } from './VColorPickerSwatches';
import { VSheet } from '@/components/VSheet/VSheet';

// Utilities
import { _ColorPicker } from './VColorPicker.base';
import { defineVueComponent } from '@/engines/vue';

export { makeVColorPickerProps, VColorPickerSlots } from './VColorPicker.base';

export const VColorPicker = defineVueComponent({
  ..._ColorPicker,
  renderHeadless: (
    vm,
    {
      mode,
      currentColor,
      updateColor,
      rootClasses,
      rootStyles,
    },
    { props },
  ) => {
    const sheetProps = VSheet.filterProps(props);

    return (
      <VSheet
        rounded={ props.rounded }
        elevation={ props.elevation }
        theme={ props.theme }
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...sheetProps }
        maxWidth={ props.width }
      >
        { !props.hideCanvas && (
          <VColorPickerCanvas
            key="canvas"
            color={ currentColor.value }
            onUpdate:color={ updateColor }
            disabled={ props.disabled }
            dotSize={ props.dotSize }
            width={ props.width }
            height={ props.canvasHeight }
          />
        )}

        { (!props.hideSliders || !props.hideInputs) && (
          <div key="controls" class="v-color-picker__controls">
            { !props.hideSliders && (
              <VColorPickerPreview
                key="preview"
                color={ currentColor.value }
                onUpdate:color={ updateColor }
                hideAlpha={ !mode.value.endsWith('a') }
                disabled={ props.disabled }
              />
            )}

            { !props.hideInputs && (
              <VColorPickerEdit
                key="edit"
                modes={ props.modes }
                mode={ mode.value }
                onUpdate:mode={ (m) => mode.value = m }
                color={ currentColor.value }
                onUpdate:color={ updateColor }
                disabled={ props.disabled }
              />
            )}
          </div>
        )}

        { props.showSwatches && (
          <VColorPickerSwatches
            key="swatches"
            color={ currentColor.value }
            onUpdate:color={ updateColor }
            maxHeight={ props.swatchesMaxHeight }
            swatches={ props.swatches }
            disabled={ props.disabled }
          />
        )}
      </VSheet>
    );
  },
});

export type VColorPicker = InstanceType<typeof VColorPicker>;
