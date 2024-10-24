// Styles
import './VCheckbox.sass';

// Components
import { _CheckboxBtn, makeVCheckboxBtnProps } from './VCheckboxBtn.base';
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';

// Composables
import { useComponent } from '@/composables/component';
import { useFocus } from '@/composables/focus';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VInputSlots } from '@/components/VInput/VInput.base';
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl.base';

export type VCheckboxSlots = Omit<VInputSlots, 'default'> & VSelectionControlSlots

export const makeVCheckboxProps = propsFactory({
  ...makeVInputProps(),
  ...omit(makeVCheckboxBtnProps(), ['inline']),
}, 'VCheckbox');

export const _Checkbox = defineComponent({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: makeVCheckboxProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:focused': (focused: boolean) => true,
  },

  slots: makeSlots<VCheckboxSlots>({
    default: null,
    label: null,
    input: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const { isFocused, focus, blur } = useFocus(vm, props);

    const uid = getUid(vm);
    const id = computed(() => props.id || `checkbox-${uid}`);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => _Input.filterProps(props));
    const checkboxProps = computed(() => _CheckboxBtn.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-checkbox',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        inputProps,
        checkboxProps,
        id,
        isFocused,
        model,
        rootClasses,
        rootStyles: styles,
        focus,
        blur,
      },
    };
  },
  renderHeadless: () => null,
});
