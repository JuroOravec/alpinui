// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component, PropType, TransitionProps } from 'vue';
import type { RawSlots } from '@/engines/types';

export interface MaybeTransitionSlots extends RawSlots {
  default: never;
}

export const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object] as PropType<string | boolean | TransitionProps & { component?: Component }>,
    default: 'fade-transition',
    validator: (val) => val !== true,
  },
  disabled: Boolean,
  group: Boolean,
}, 'transition');

export const _MaybeTransition = defineComponent({
  name: 'MaybeTransition',

  props: makeTransitionProps(),

  slots: makeSlots<MaybeTransitionSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    return {
      expose: {},
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});
