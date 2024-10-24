// Components
import { _SelectionControl, makeVSelectionControlProps } from '@/components/VSelectionControl/VSelectionControl.base';

// Composables
import { useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { IconValue } from '../VIcon/icons.base';
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl';

export const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate',
  },

  ...makeVSelectionControlProps({
    falseIcon: '$checkboxOff',
    trueIcon: '$checkboxOn',
  }),
}, 'VCheckboxBtn');

export type VCheckboxBtnSlots = VSelectionControlSlots;

export const _CheckboxBtn = defineComponent({
  name: 'VCheckboxBtn',

  props: makeVCheckboxBtnProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  slots: makeSlots<VCheckboxBtnSlots>({
    default: null,
    label: null,
    input: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const indeterminate = useProxiedModel(vm, props, 'indeterminate');
    const model = useProxiedModel(vm, props, 'modelValue');

    function onChange(v: any) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }

    const falseIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.falseIcon;
    });

    const trueIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.trueIcon;
    });

    const controlProps = computed(() => omit(_SelectionControl.filterProps(props), ['modelValue']));

    const rootClasses = computed(() => normalizeClass([
      'v-checkbox-btn',
      classes.value,
    ]));

    const rootAriaChecked = computed(() => indeterminate.value ? 'mixed' : undefined);

    return {
      expose: {},
      renderInput: {
        controlProps,
        model,
        onChange,
        falseIcon,
        trueIcon,
        rootAriaChecked,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
