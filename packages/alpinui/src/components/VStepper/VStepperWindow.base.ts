// Components
import { VStepperSymbol } from './shared';
import { _Window, makeVWindowProps } from '@/components/VWindow/VWindow.base';

// Composables
import { useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VWindowSlots } from '@/components/VWindow/VWindow.base';

export const makeVStepperWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory']),
}, 'VStepperWindow');

export type VStepperWindowSlots = VWindowSlots;

export const _StepperWindow = defineComponent({
  name: 'VStepperWindow',

  props: makeVStepperWindowProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  slots: makeSlots<VStepperWindowSlots>({
    default: null,
    additional: null,
    prev: null,
    next: null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject } = vm.reactivity;

    const group = inject(VStepperSymbol, null);
    const { classes, styles } = useComponent(vm, props);
    const _model = useProxiedModel(vm, props, 'modelValue');

    const model = computed({
      get() {
        // Always return modelValue if defined
        // or if not within a VStepper group
        if (_model.value != null || !group) return _model.value;

        // If inside of a VStepper, find the currently selected
        // item by id. Item value may be assigned by its index
        return group.items.value.find((item) => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      },
    });

    const windowProps = computed(() => _Window.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-stepper-window',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        model,
        rootClasses,
        rootStyles: styles,
        windowProps,
      },
    };
  },
  renderHeadless: () => null,
});
