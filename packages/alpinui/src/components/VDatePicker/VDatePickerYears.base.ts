// Styles
import './VDatePickerYears.sass';

// Composables
import { useDate } from '@/composables/date';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, createRange, normalizeStyle, templateRef } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

// Types
export interface Year {
  text: string;
  value: number;
}

export type VDatePickerYearsSlots = {
  year: {
    year: Year;
    i: number;
    props: {
      active: boolean;
      color?: string;
      rounded: boolean;
      text: string;
      variant: 'flat' | 'text';
      onClick: () => void;
    };
  };
}

export const makeVDatePickerYearsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
}, 'VDatePickerYears');

export const _DatePickerYears = defineComponent({
  name: 'VDatePickerYears',

  props: makeVDatePickerYearsProps(),

  emits: {
    'update:modelValue': (year: number) => true,
  },

  slots: makeSlots<VDatePickerYearsSlots>({
    year: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, onMounted, watchEffect } = vm.reactivity;

    const adapter = useDate(vm);
    const model = useProxiedModel(vm, props, 'modelValue');
    const years = computed(() => {
      const year = adapter.getYear(adapter.date());

      let min = year - 100;
      let max = year + 52;

      if (props.min) {
        min = adapter.getYear(adapter.date(props.min));
      }

      if (props.max) {
        max = adapter.getYear(adapter.date(props.max));
      }

      let date = adapter.startOfYear(adapter.date());

      date = adapter.setYear(date, min);

      return createRange(max - min + 1, min).map((i) => {
        const text = adapter.format(date, 'year');
        date = adapter.setYear(date, adapter.getYear(date) + 1);

        return {
          text,
          value: i,
        };
      });
    });

    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date());
    });

    const yearRef = templateRef(vm);

    onMounted(async() => {
      await nextTick();
      yearRef.el?.scrollIntoView({ block: 'center' });
    });

    const onYearClick = (year: Year) => {
      if (model.value === year.value) {
        vm.emit('update:modelValue', model.value);
        return;
      }
      model.value = year.value;
    };

    const rootStyles = computed(() => normalizeStyle([
      { height: convertToUnit(props.height) },
    ]));

    return {
      expose: {},
      renderInput: {
        model,
        years,
        yearRef,
        onYearClick,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
