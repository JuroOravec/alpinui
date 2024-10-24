// Styles
import './VDatePickerMonths.sass';

// Composables
import { useDate } from '@/composables/date';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, createRange, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export type VDatePickerMonthsSlots = {
  month: {
    month: {
      text: string;
      value: number;
    };
    i: number;
    props: {
      onClick: () => void;
    };
  };
}

export const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
  year: Number,
}, 'VDatePickerMonths');

export const _DatePickerMonths = defineComponent({
  name: 'VDatePickerMonths',

  props: makeVDatePickerMonthsProps(),

  emits: {
    'update:modelValue': (date: any) => true,
  },

  slots: makeSlots<VDatePickerMonthsSlots>({
    month: null,
  }),

  setupHeadless(props, vm) {
    const { computed, watchEffect } = vm.reactivity;

    const adapter = useDate(vm);
    const model = useProxiedModel(vm, props, 'modelValue');

    const months = computed(() => {
      let date = adapter.startOfYear(adapter.date());
      if (props.year) {
        date = adapter.setYear(date, props.year);
      }
      return createRange(12).map((i) => {
        const text = adapter.format(date, 'monthShort');
        const isDisabled =
          !!(
            (props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date)) ||
            (props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max))))
          );
        date = adapter.getNextMonth(date);

        return {
          isDisabled,
          text,
          value: i,
        };
      });
    });

    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date());
    });

    function onClick(i: number) {
      if (model.value === i) {
        vm.emit('update:modelValue', model.value);
        return;
      }
      model.value = i;
    }

    const rootStyles = computed(() => normalizeStyle([
      { height: convertToUnit(props.height) },
    ]));

    return {
      expose: {},
      renderInput: {
        rootStyles,
        months,
        model,
        onClick,
      },
    };
  },
  renderHeadless: () => null,
});
