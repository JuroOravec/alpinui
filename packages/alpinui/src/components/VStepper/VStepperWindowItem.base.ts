// Components
import { _WindowItem, makeVWindowItemProps } from '@/components/VWindow/VWindowItem.base';

// Composables
import { useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VWindowItemSlots } from '@/components/VWindow/VWindowItem.base';

export const makeVStepperWindowItemProps = propsFactory({
  ...makeVWindowItemProps(),
}, 'VStepperWindowItem');

export type VStepperWindowItemSlots = VWindowItemSlots;

export const _StepperWindowItem = defineComponent({
  name: 'VStepperWindowItem',

  props: makeVStepperWindowItemProps(),

  slots: makeSlots<VStepperWindowItemSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const windowItemProps = computed(() => _WindowItem.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-stepper-window-item',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
        windowItemProps,
      },
    };
  },
  renderHeadless: () => null,
});
