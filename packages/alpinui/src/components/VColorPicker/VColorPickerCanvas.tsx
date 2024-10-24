// Utilities
import { _ColorPickerCanvas } from './VColorPickerCanvas.base';
import { defineVueComponent } from '@/engines/vue';

export { makeVColorPickerCanvasProps, VColorPickerCanvasSlots } from './VColorPickerCanvas.base';

export const VColorPickerCanvas = defineVueComponent({
  ..._ColorPickerCanvas,
  renderHeadless: (
    vm,
    {
      canvasClasses,
      canvasStyles,
      canvasRef,
      canvasWidth,
      canvasHeight,
      dotClasses,
      dotStyles,
      handleMouseDown,
      resizeRef,
    },
    { props },
  ) => {
    return (
      <div
        ref={ resizeRef }
        class={ canvasClasses.value }
        style={ canvasStyles.value }
        onMousedown={ handleMouseDown }
        onTouchstartPassive={ handleMouseDown }
      >
        <canvas
          ref={ canvasRef }
          width={ canvasWidth.value }
          height={ canvasHeight.value }
        />
        { props.color && (
          <div
            class={ dotClasses.value }
            style={ dotStyles.value }
          />
        )}
      </div>
    );
  },
});

export type VColorPickerCanvas = InstanceType<typeof VColorPickerCanvas>;
