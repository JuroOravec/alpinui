// Styles
import './VMessages.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';

// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component, PropType } from 'vue';

export type VMessageSlot = {
  message: string;
}

export type VMessagesSlots = {
  message: VMessageSlot;
}

export const makeVMessagesProps = propsFactory({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String] as PropType<string | readonly string[]>,
    default: () => ([]),
  },

  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: {
      // NOTE(Alpinui): We set the default component in the Vue file
      component: null as any as Component,
      leaveAbsolute: true,
      group: true,
    },
  }),
}, 'VMessages');

export const _Messages = defineComponent({
  name: 'VMessages',

  props: makeVMessagesProps(),

  slots: makeSlots<VMessagesSlots>({
    message: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const messages = computed(() => wrapInArray(props.messages));
    const { textColorClasses, textColorStyles } = useTextColor(vm, computed(() => props.color));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-messages',
      textColorClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      textColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        messages,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
