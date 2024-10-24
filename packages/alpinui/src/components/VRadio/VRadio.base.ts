// Components
import { _SelectionControl, makeVSelectionControlProps } from '@/components/VSelectionControl/VSelectionControl.base';

// Composables
import { useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl';

export const makeVRadioProps = propsFactory({
  ...makeVSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn',
  }),
}, 'VRadio');

export type VRadioSlots = VSelectionControlSlots;

export const _Radio = defineComponent({
  name: 'VRadio',

  props: makeVRadioProps(),

  slots: makeSlots<VRadioSlots>({
    default: null,
    label: null,
    input: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const controlProps = computed(() => _SelectionControl.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-radio',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        controlProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
