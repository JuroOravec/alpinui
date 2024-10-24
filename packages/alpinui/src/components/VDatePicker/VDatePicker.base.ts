// Styles
import './VDatePicker.sass';

// Components
import { _DatePickerControls, makeVDatePickerControlsProps } from './VDatePickerControls.base';
import { _DatePickerHeader } from './VDatePickerHeader.base';
import { _DatePickerMonth, makeVDatePickerMonthProps } from './VDatePickerMonth.base';
import { _DatePickerMonths, makeVDatePickerMonthsProps } from './VDatePickerMonths.base';
import { _DatePickerYears, makeVDatePickerYearsProps } from './VDatePickerYears.base';
import { _Picker, makeVPickerProps } from '@/labs/VPicker/VPicker.base';

// Composables
import { useComponent } from '@/composables/component';
import { useDate } from '@/composables/date';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, omit, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VPickerSlots } from '@/labs/VPicker/VPicker.base';

// Types
export type VDatePickerSlots = Omit<VPickerSlots, 'header'> & {
  header: {
    header: string;
    transition: string;
  };
}

export const makeVDatePickerProps = propsFactory({
  // TODO(Vuetify): implement in v3.5
  // calendarIcon: {
  //   type: String,
  //   default: '$calendar',
  // },
  // keyboardIcon: {
  //   type: String,
  //   default: '$edit',
  // },
  // inputMode: {
  //   type: String as PropType<'calendar' | 'keyboard'>,
  //   default: 'calendar',
  // },
  // inputText: {
  //   type: String,
  //   default: '$vuetify.datePicker.input.placeholder',
  // },
  // inputPlaceholder: {
  //   type: String,
  //   default: 'dd/mm/yyyy',
  // },
  header: {
    type: String,
    default: '$vuetify.datePicker.header',
  },

  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps({
    weeksInMonth: 'static' as const,
  }),
  ...omit(makeVDatePickerMonthsProps(), ['modelValue']),
  ...omit(makeVDatePickerYearsProps(), ['modelValue']),
  ...makeVPickerProps({ title: '$vuetify.datePicker.title' }),

  modelValue: null,
}, 'VDatePicker');

export const _DatePicker = defineComponent({
  name: 'VDatePicker',

  props: makeVDatePickerProps(),

  emits: {
    'update:modelValue': (date: any) => true,
    'update:month': (date: any) => true,
    'update:year': (date: any) => true,
    // 'update:inputMode': (date: any) => true,
    'update:viewMode': (date: any) => true,
  },

  slots: makeSlots<VDatePickerSlots>({
    header: null,
    default: null,
    actions: null,
    title: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, shallowRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const adapter = useDate(vm);
    const { t } = useLocale(vm);

    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      undefined,
      (v) => wrapInArray(v),
      (v) => props.multiple ? v : v[0],
    );

    const viewMode = useProxiedModel(vm, props, 'viewMode');
    // const inputMode = useProxiedModel(props, 'inputMode')
    const internal = computed(() => {
      const value = adapter.date(model.value?.[0]);

      return value && adapter.isValid(value) ? value : adapter.date();
    });

    const month = ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))));
    const year = ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))));

    const isReversing = shallowRef(false);
    const header = computed(() => {
      if (props.multiple && model.value.length > 1) {
        return t('$vuetify.datePicker.itemsSelected', model.value.length);
      }

      return (model.value[0] && adapter.isValid(model.value[0]))
        ? adapter.format(adapter.date(model.value[0]), 'normalDateWithWeekday')
        : t(props.header);
    });
    const text = computed(() => {
      let date = adapter.date();

      date = adapter.setDate(date, 1);
      date = adapter.setMonth(date, month.value);
      date = adapter.setYear(date, year.value);

      return adapter.format(date, 'monthAndYear');
    });
    // const headerIcon = computed(() => props.inputMode === 'calendar' ? props.keyboardIcon : props.calendarIcon)
    const headerTransition = computed(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`);
    const minDate = computed(() => {
      const date = adapter.date(props.min);

      return props.min && adapter.isValid(date) ? date : null;
    });
    const maxDate = computed(() => {
      const date = adapter.date(props.max);

      return props.max && adapter.isValid(date) ? date : null;
    });
    const disabled = computed(() => {
      if (props.disabled) return true;

      const targets = [];

      if (viewMode.value !== 'month') {
        targets.push(...['prev', 'next']);
      } else {
        let _date = adapter.date();

        _date = adapter.setYear(_date, year.value);
        _date = adapter.setMonth(_date, month.value);

        if (minDate.value) {
          const date = adapter.addDays(adapter.startOfMonth(_date), -1);

          adapter.isAfter(minDate.value, date) && targets.push('prev');
        }

        if (maxDate.value) {
          const date = adapter.addDays(adapter.endOfMonth(_date), 1);

          adapter.isAfter(date, maxDate.value) && targets.push('next');
        }
      }

      return targets;
    });

    // function onClickAppend () {
    //   inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
    // }

    function onClickNext() {
      if (month.value < 11) {
        month.value++;
      } else {
        year.value++;
        month.value = 0;
        onUpdateYear(year.value);
      }
      onUpdateMonth(month.value);
    }

    function onClickPrev() {
      if (month.value > 0) {
        month.value--;
      } else {
        year.value--;
        month.value = 11;
        onUpdateYear(year.value);
      }
      onUpdateMonth(month.value);
    }

    function onClickDate() {
      viewMode.value = 'month';
    }

    function onClickMonth() {
      viewMode.value = viewMode.value === 'months' ? 'month' : 'months';
    }

    function onClickYear() {
      viewMode.value = viewMode.value === 'year' ? 'month' : 'year';
    }

    function onUpdateMonth(value: number) {
      if (viewMode.value === 'months') onClickMonth();

      vm.emit('update:month', value);
    }

    function onUpdateYear(value: number) {
      if (viewMode.value === 'year') onClickYear();

      vm.emit('update:year', value);
    }

    watch(model, (val, oldVal) => {
      const arrBefore = wrapInArray(oldVal);
      const arrAfter = wrapInArray(val);

      if (!arrAfter.length) return;

      const before = adapter.date(arrBefore[arrBefore.length - 1]);
      const after = adapter.date(arrAfter[arrAfter.length - 1]);
      const newMonth = adapter.getMonth(after);
      const newYear = adapter.getYear(after);

      if (newMonth !== month.value) {
        month.value = newMonth;
        onUpdateMonth(month.value);
      }

      if (newYear !== year.value) {
        year.value = newYear;
        onUpdateYear(year.value);
      }

      isReversing.value = adapter.isBefore(before, after);
    });

    const pickerProps = computed(() => _Picker.filterProps(props));
    const datePickerControlsProps = computed(() => _DatePickerControls.filterProps(props));
    const datePickerHeaderProps = computed(() => _DatePickerHeader.filterProps(props));
    const datePickerMonthProps = computed(() => _DatePickerMonth.filterProps(props));
    const datePickerMonthsProps = computed(() => omit(_DatePickerMonths.filterProps(props), ['modelValue']));
    const datePickerYearsProps = computed(() => omit(_DatePickerYears.filterProps(props), ['modelValue']));

    const headerProps = computed(() => ({
      header: header.value,
      transition: headerTransition.value,
    }));

    const rootClasses = computed(() => normalizeClass([
      'v-date-picker',
      `v-date-picker--${viewMode.value}`,
      {
        'v-date-picker--show-week': props.showWeek,
      },
      classes.value,
    ]));

    const title = computed(() => t(props.title));

    return {
      expose: {},
      renderInput: {
        model,
        disabled,
        text,
        title,
        month,
        year,
        minDate,
        maxDate,
        pickerProps,
        datePickerControlsProps,
        datePickerHeaderProps,
        datePickerMonthProps,
        datePickerMonthsProps,
        datePickerYearsProps,
        headerProps,
        viewMode,
        rootClasses,
        rootStyles: styles,
        onClickDate,
        onUpdateMonth,
        onUpdateYear,
        onClickNext,
        onClickPrev,
        onClickMonth,
        onClickYear,
      },
    };
  },
  renderHeadless: () => null,
});
