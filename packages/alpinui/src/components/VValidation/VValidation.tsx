// Utilities
import { _Validation } from './VValidation.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VValidationSlots } from './VValidation.base';
import type { GenericProps } from '@/engines/vue';

export { makeVValidationProps, VValidationSlots } from './VValidation.base';

export const VValidation = genericVueComponent<new <T>(
  props: {
    modelValue?: T | null;
    'onUpdate:modelValue'?: (value: T | null) => void;
  },
  slots: VValidationSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Validation,
  renderHeadless: (
    vm,
    { validation },
    { slots },
  ) => {
    return slots.default?.(validation) ?? null;
  },
});

export type VValidation = InstanceType<typeof VValidation>;
