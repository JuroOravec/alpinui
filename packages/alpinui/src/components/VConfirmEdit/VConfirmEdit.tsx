// Components
import { VBtn } from '@/components/VBtn';

// Utilities
import { _ConfirmEdit } from './VConfirmEdit.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VConfirmEditSlots } from './VConfirmEdit.base';
import type { GenericProps } from '@/engines/vue';

export { makeVConfirmEditProps, VConfirmEditSlots } from './VConfirmEdit.base';

export const VConfirmEdit = genericVueComponent<new <T> (
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
    'onSave'?: (value: T) => void;
  },
  slots: VConfirmEditSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  ..._ConfirmEdit,
  renderHeadless: (
    vm,
    {
      actionsUsed,
      isPristine,
      internalModel,
      cancelText,
      okText,
      cancel,
      save,
    },
    { props, slots },
  ) => {
    const actions = (
      <>
        <VBtn
          disabled={ isPristine.value }
          variant="text"
          color={ props.color }
          onClick={ cancel }
          text={ cancelText.value }
        />

        <VBtn
          disabled={ isPristine.value }
          variant="text"
          color={ props.color }
          onClick={ save }
          text={ okText.value }
        />
      </>
    );
    return (
      <>
        {
          slots.default?.({
            model: internalModel,
            save,
            cancel,
            isPristine: isPristine.value,
            get actions() {
              actionsUsed.value = true;
              return actions;
            },
          })
        }

        { !actionsUsed.value && actions }
      </>
    );
  },
});

export type VConfirmEdit = InstanceType<typeof VConfirmEdit>;
