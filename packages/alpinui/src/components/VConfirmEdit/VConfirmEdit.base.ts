// Composables
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { deepEqual } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Ref, VNode } from 'vue';

export type VConfirmEditSlots<T> = {
  default: {
    model: Ref<T>;
    save: () => void;
    cancel: () => void;
    isPristine: boolean;
    get actions (): VNode;
  };
}

export const makeVConfirmEditProps = propsFactory({
  modelValue: null,
  color: String,
  cancelText: {
    type: String,
    default: '$vuetify.confirmEdit.cancel',
  },
  okText: {
    type: String,
    default: '$vuetify.confirmEdit.ok',
  },
}, 'VConfirmEdit');

export const _ConfirmEdit = defineComponent({
  name: 'VConfirmEdit',

  props: makeVConfirmEditProps(),

  emits: {
    cancel: () => true,
    save: (value: any) => true,
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VConfirmEditSlots<unknown>>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, toRaw, watchEffect } = vm.reactivity;

    const model = useProxiedModel(vm, props, 'modelValue');
    const internalModel = ref();
    watchEffect(() => {
      internalModel.value = structuredClone(toRaw(model.value));
    });

    const { t } = useLocale(vm);

    const isPristine = computed(() => {
      return deepEqual(model.value, internalModel.value);
    });

    function save() {
      model.value = internalModel.value;
      vm.emit('save', internalModel.value);
    }

    function cancel() {
      internalModel.value = structuredClone(toRaw(model.value));
      vm.emit('cancel');
    }

    const actionsUsed = ref(false);

    const cancelText = computed(() => t(props.cancelText));
    const okText = computed(() => t(props.okText));

    return {
      expose: {
        save,
        cancel,
        isPristine,
      },
      renderInput: {
        actionsUsed,
        isPristine,
        internalModel,
        cancelText,
        okText,
        cancel,
        save,
      },
    };
  },
  renderHeadless: () => null,
});
