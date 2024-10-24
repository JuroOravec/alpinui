// Styles
import './VColorPickerPreview.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { nullColor } from './util';
import { HexToHSV } from '@/util/colorUtils';
import { defineComponent } from '@/util/defineComponent';
import { SUPPORTS_EYE_DROPPER } from '@/util/globals';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { Hex, HSV } from '@/util/colorUtils';

export const makeVColorPickerPreviewProps = propsFactory({
  color: {
    type: Object as PropType<HSV | null>,
  },
  disabled: Boolean,
  hideAlpha: Boolean,

  ...makeComponentProps(),
}, 'VColorPickerPreview');

export interface VColorPickerPreviewSlots {
  /** Empty */
}

export const _ColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',

  props: makeVColorPickerPreviewProps(),

  emits: {
    'update:color': (color: HSV) => true,
  },

  slots: makeSlots<VColorPickerPreviewSlots>(null),

  setupHeadless(props, vm) {
    const { computed, onUnmounted } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const abortController = new AbortController();

    onUnmounted(() => abortController.abort());

    async function openEyeDropper() {
      if (!SUPPORTS_EYE_DROPPER) return;

      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open({ signal: abortController.signal });
        const colorHexValue = HexToHSV(result.sRGBHex as Hex);
        vm.emit('update:color', { ...(props.color ?? nullColor), ...colorHexValue });
      } catch (e) { }
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-color-picker-preview',
      { 'v-color-picker-preview--hide-alpha': props.hideAlpha },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
        nullColor,
        openEyeDropper,
        SUPPORTS_EYE_DROPPER,
      },
    };
  },
  renderHeadless: () => null,
});
