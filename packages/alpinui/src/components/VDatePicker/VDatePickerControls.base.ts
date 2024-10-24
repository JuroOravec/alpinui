// Styles
import './VDatePickerControls.sass';

// Components
import { IconValue } from '@/components/VIcon/icons.base';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RawSlots } from '@/engines/types';

export const makeVDatePickerControlsProps = propsFactory({
  active: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  disabled: {
    type: [Boolean, String, Array] as PropType<boolean | string | string[]>,
    default: false,
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  modeIcon: {
    type: IconValue,
    default: '$subgroup',
  },
  text: String,
  viewMode: {
    type: String as PropType<'month' | 'months' | 'year'>,
    default: 'month',
  },
}, 'VDatePickerControls');

export interface VDatePickerControlsSlots extends RawSlots {
  default: never;
}

export const _DatePickerControls = defineComponent({
  name: 'VDatePickerControls',

  props: makeVDatePickerControlsProps(),

  emits: {
    'click:year': () => true,
    'click:month': () => true,
    'click:prev': () => true,
    'click:next': () => true,
    'click:text': () => true,
  },

  slots: makeSlots<VDatePickerControlsSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const disableMonth = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('text')
        : !!props.disabled;
    });
    const disableYear = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('mode')
        : !!props.disabled;
    });
    const disablePrev = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('prev')
        : !!props.disabled;
    });
    const disableNext = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('next')
        : !!props.disabled;
    });

    function onClickPrev() {
      vm.emit('click:prev');
    }

    function onClickNext() {
      vm.emit('click:next');
    }

    function onClickYear() {
      vm.emit('click:year');
    }

    function onClickMonth() {
      vm.emit('click:month');
    }

    return {
      expose: {},
      renderInput: {
        disableMonth,
        disableYear,
        disablePrev,
        disableNext,
        onClickMonth,
        onClickYear,
        onClickPrev,
        onClickNext,
      },
    };
  },
  renderHeadless: () => null,
});
