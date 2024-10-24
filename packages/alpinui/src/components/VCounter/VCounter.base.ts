// Styles
import './VCounter.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component } from 'vue';

export const makeVCounterProps = propsFactory({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0,
  },

  ...makeComponentProps(),
  ...makeTransitionProps({
    // NOTE(Alpinui): The default component is set in `VCounter.tsx`
    transition: { component: null as any as Component },
  }),
}, 'VCounter');

export type VCounterSlot = {
  counter: string;
  max: string | number | undefined;
  value: string | number | undefined;
}

export type VCounterSlots = {
  default: VCounterSlot;
}

export const _Counter = defineComponent({
  name: 'VCounter',

  functional: true,

  props: makeVCounterProps(),

  slots: makeSlots<VCounterSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });

    const rootClasses = computed(() => normalizeClass([
      'v-counter',
      {
        'text-error': !!(props.max && !props.disabled &&
          parseFloat(props.value) > parseFloat(props.max)),
      },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        counter,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
