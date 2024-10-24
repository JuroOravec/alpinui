// Styles
import './VDatePickerMonth.sass';

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar';
import { useDate } from '@/composables/date/date';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export type VDatePickerMonthSlots = {
  day: {
    props: {
      onClick: () => void;
    };
    item: any;
    i: number;
  };
}

export const makeVDatePickerMonthProps = propsFactory({
  color: String,
  hideWeekdays: Boolean,
  multiple: [Boolean, Number, String] as PropType<boolean | 'range' | number | (string & {})>,
  showWeek: Boolean,
  transition: {
    type: String,
    default: 'picker-transition',
  },
  reverseTransition: {
    type: String,
    default: 'picker-reverse-transition',
  },

  ...makeCalendarProps(),
}, 'VDatePickerMonth');

export const _DatePickerMonth = defineComponent({
  name: 'VDatePickerMonth',

  props: makeVDatePickerMonthProps(),

  emits: {
    'update:modelValue': (date: unknown) => true,
    'update:month': (date: number) => true,
    'update:year': (date: number) => true,
  },

  slots: makeSlots<VDatePickerMonthSlots>({
    day: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, shallowRef, watch } = vm.reactivity;

    const daysRef = ref();

    const { daysInMonth, model, weekNumbers } = useCalendar(vm, props);
    const adapter = useDate(vm);

    const rangeStart = shallowRef();
    const rangeStop = shallowRef();
    const isReverse = shallowRef(false);

    const transition = computed(() => {
      return !isReverse.value ? props.transition : props.reverseTransition;
    });

    if (props.multiple === 'range' && model.value.length > 0) {
      rangeStart.value = model.value[0];
      if (model.value.length > 1) {
        rangeStop.value = model.value[model.value.length - 1];
      }
    }

    const atMax = computed(() => {
      const max = ['number', 'string'].includes(typeof props.multiple) ? Number(props.multiple) : Infinity;

      return model.value.length >= max;
    });

    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal) return;

      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date);
    });

    function onRangeClick(value: unknown) {
      const _value = adapter.startOfDay(value);

      if (model.value.length === 0) {
        rangeStart.value = undefined;
      }
      if (!rangeStart.value) {
        rangeStart.value = _value;
        model.value = [rangeStart.value];
      } else if (!rangeStop.value) {
        if (adapter.isSameDay(_value, rangeStart.value)) {
          rangeStart.value = undefined;
          model.value = [];
          return;
        } else if (adapter.isBefore(_value, rangeStart.value)) {
          rangeStop.value = adapter.endOfDay(rangeStart.value);
          rangeStart.value = _value;
        } else {
          rangeStop.value = adapter.endOfDay(_value);
        }

        const diff = adapter.getDiff(rangeStop.value, rangeStart.value, 'days');
        const datesInRange = [rangeStart.value];

        for (let i = 1; i < diff; i++) {
          const nextDate = adapter.addDays(rangeStart.value, i);
          datesInRange.push(nextDate);
        }

        datesInRange.push(rangeStop.value);

        model.value = datesInRange;
      } else {
        rangeStart.value = value;
        rangeStop.value = undefined;
        model.value = [rangeStart.value];
      }
    }

    function onMultipleClick(value: unknown) {
      const index = model.value.findIndex((selection) => adapter.isSameDay(selection, value));

      if (index === -1) {
        model.value = [...model.value, value];
      } else {
        const value = [...model.value];
        value.splice(index, 1);
        model.value = value;
      }
    }

    function onClick(value: unknown) {
      if (props.multiple === 'range') {
        onRangeClick(value);
      } else if (props.multiple) {
        onMultipleClick(value);
      } else {
        model.value = [value];
      }
    }

    return {
      expose: {},
      renderInput: {
        weekNumbers,
        transition,
        daysRef,
        daysInMonth,
        adapter,
        atMax,
        onClick,
      },
    };
  },
  renderHeadless: () => null,
});
