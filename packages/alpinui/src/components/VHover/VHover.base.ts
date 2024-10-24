// Composables
import { makeDelayProps, useDelay } from '@/composables/delay';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export type VHoverSlots = {
  default: {
    isHovering: boolean | null;
    props: Record<string, unknown>;
  };
}

export const makeVHoverProps = propsFactory({
  disabled: Boolean,
  modelValue: {
    type: Boolean,
    default: null,
  },

  ...makeDelayProps(),
}, 'VHover');

export const _Hover = defineComponent({
  name: 'VHover',

  props: makeVHoverProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VHoverSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const isHovering = useProxiedModel(vm, props, 'modelValue');
    const { runOpenDelay, runCloseDelay } = useDelay(props, (value) => !props.disabled && (isHovering.value = value));

    return {
      expose: {},
      renderInput: {
        isHovering,
        runOpenDelay,
        runCloseDelay,
      },
    };
  },
  renderHeadless: () => null,
});
