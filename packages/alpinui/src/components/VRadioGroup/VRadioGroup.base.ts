// Styles
import './VRadioGroup.sass';

// Components
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';
import { _SelectionControl } from '@/components/VSelectionControl/VSelectionControl.base';
import { makeSelectionControlGroupProps } from '@/components/VSelectionControlGroup/VSelectionControlGroup.base';

// Composables
import { useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { IconValue } from '../VIcon/icons.base';
import type { VInputSlots } from '@/components/VInput/VInput';
import type { RawSlots } from '@/engines/types';

export type VRadioGroupSlots = Omit<VInputSlots, 'default'> & RawSlots & {
  default: never;
  label: {
    label: string | undefined;
    props: Record<string, any>;
  };
}

export const makeVRadioGroupProps = propsFactory({
  height: {
    type: [Number, String],
    default: 'auto',
  },

  ...makeVInputProps(),
  ...omit(makeSelectionControlGroupProps(), ['multiple']),

  trueIcon: {
    type: IconValue,
    default: '$radioOn',
  },
  falseIcon: {
    type: IconValue,
    default: '$radioOff',
  },
  type: {
    type: String,
    default: 'radio',
  },
}, 'VRadioGroup');

export const _RadioGroup = defineComponent({
  name: 'VRadioGroup',

  inheritAttrs: false,

  props: makeVRadioGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VRadioGroupSlots>({
    default: null,
    label: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const uid = getUid(vm);
    const id = computed(() => props.id || `radio-group-${uid}`);
    const model = useProxiedModel(vm, props, 'modelValue');

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => _Input.filterProps(props));
    const controlProps = computed(() => _SelectionControl.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-radio-group',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        id,
        model,
        inputProps,
        controlProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
