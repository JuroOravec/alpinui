// Utilities
import { _Form } from './VForm.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VFormSlots } from './VForm.base';

export { makeVFormProps, VFormSlots } from './VForm.base';

export const VForm = genericVueComponent<VFormSlots>()({
  ..._Form,
  renderHeadless: (
    vm,
    { form, formRef, rootClasses, rootStyles, onReset, onSubmit },
    { slots },
  ) => {
    return (
      <form
        ref={ formRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        novalidate
        onReset={ onReset }
        onSubmit={ onSubmit }
      >
        { slots.default?.(form) }
      </form>
    );
  },
});

export type VForm = InstanceType<typeof VForm>;
