// Composables
import { useLocale } from '@/composables/locale';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export type VStepperActionsSlots = {
  prev: {
    props: { onClick: () => void };
  };
  next: {
    props: { onClick: () => void };
  };
}

export const makeVStepperActionsProps = propsFactory({
  color: String,
  disabled: {
    type: [Boolean, String] as PropType<boolean | 'next' | 'prev'>,
    default: false,
  },
  prevText: {
    type: String,
    default: '$vuetify.stepper.prev',
  },
  nextText: {
    type: String,
    default: '$vuetify.stepper.next',
  },
}, 'VStepperActions');

export const _StepperActions = defineComponent({
  name: 'VStepperActions',

  props: makeVStepperActionsProps(),

  emits: {
    'click:prev': () => true,
    'click:next': () => true,
  },

  slots: makeSlots<VStepperActionsSlots>({
    prev: null,
    next: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { t } = useLocale(vm);
    function onClickPrev() {
      vm.emit('click:prev');
    }

    function onClickNext() {
      vm.emit('click:next');
    }

    const prevDefaults = computed(() => ({
      VBtn: {
        disabled: ['prev', true].includes(props.disabled),
        text: t(props.prevText),
        variant: 'text',
      },
    }));

    const nextDefaults = computed(() => ({
      VBtn: {
        color: props.color,
        disabled: ['next', true].includes(props.disabled),
        text: t(props.nextText),
        variant: 'tonal',
      },
    }));

    return {
      expose: {},
      renderInput: {
        nextDefaults,
        prevDefaults,
        onClickNext,
        onClickPrev,
      },
    };
  },
  renderHeadless: () => null,
});
