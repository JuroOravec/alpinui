// Styles
import './VColorPickerEdit.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { modes, nullColor } from './util';
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { HSV } from '@/util/colorUtils';

export const makeVColorPickerEditProps = propsFactory({
  color: Object as PropType<HSV | null>,
  disabled: Boolean,
  mode: {
    type: String as PropType<keyof typeof modes>,
    default: 'rgba',
    validator: (v: string) => Object.keys(modes).includes(v),
  },
  modes: {
    type: Array as PropType<readonly (keyof typeof modes)[]>,
    default: () => Object.keys(modes),
    validator: (v: any) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m)),
  },

  ...makeComponentProps(),
}, 'VColorPickerEdit');

export interface VColorPickerEditSlots {
  /** Empty */
}

export const _ColorPickerEdit = defineComponent({
  name: 'VColorPickerEdit',

  props: makeVColorPickerEditProps(),

  emits: {
    'update:color': (color: HSV) => true,
    'update:mode': (mode: keyof typeof modes) => true,
  },

  slots: makeSlots<VColorPickerEditSlots>(null),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const enabledModes = computed(() => {
      return props.modes.map((key) => ({ ...modes[key], name: key }));
    });

    const inputs = computed(() => {
      const mode = enabledModes.value.find((m) => m.name === props.mode);

      if (!mode) return [];

      const color = props.color ? mode.to(props.color) : null;

      return mode.inputs?.map(({ getValue, getColor, ...inputProps }) => {
        return {
          ...mode.inputProps,
          ...inputProps,
          disabled: props.disabled,
          value: color && getValue(color),
          onChange: (e: InputEvent) => {
            const target = e.target as HTMLInputElement | null;

            if (!target) return;

            vm.emit('update:color', mode.from(getColor(color ?? mode.to(nullColor), target.value)));
          },
        };
      });
    });

    const rootClasses = computed(() => normalizeClass([
      'v-color-picker-edit',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        enabledModes,
        inputs,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
