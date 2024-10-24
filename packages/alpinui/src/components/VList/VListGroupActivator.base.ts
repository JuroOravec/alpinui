// Composables
import { useNestedGroupActivator } from '@/composables/nested/nested';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export type VListGroupActivatorSlots = {
  default: never;
};

export const makeVListGroupActivatorProps = propsFactory({
}, 'VListGroupActivator');

export const _ListGroupActivator = defineComponent({
  name: 'VListGroupActivator',

  props: {},

  slots: makeSlots<VListGroupActivatorSlots>({
    default: null,
  }),

  setupHeadless(_, vm) {
    useNestedGroupActivator(vm);

    return { expose: {}, renderInput: {} };
  },
  renderHeadless: (vm, renderInput, { slots }) => slots.default?.() ?? null,
});
