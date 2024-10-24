// Composables
import { makeValidationProps, useValidation } from '@/composables/validation';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { makeSlots } from '@/util/slots';

export type VValidationSlots = {
  default: ReturnType<typeof useValidation>;
}

export const makeVValidationProps = makeValidationProps;

export const _Validation = defineComponent({
  name: 'VValidation',

  props: makeVValidationProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VValidationSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const validation = useValidation(vm, props, 'validation');

    return {
      expose: {},
      renderInput: {
        validation,
      },
    };
  },
  renderHeadless: () => null,
});
