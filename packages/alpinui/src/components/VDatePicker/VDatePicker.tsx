// Components
import { VDatePickerControls } from './VDatePickerControls';
import { VDatePickerHeader } from './VDatePickerHeader';
import { VDatePickerMonth } from './VDatePickerMonth';
import { VDatePickerMonths } from './VDatePickerMonths';
import { VDatePickerYears } from './VDatePickerYears';
import { VFadeTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VPicker } from '@/labs/VPicker/VPicker';

// Utilities
import { _DatePicker } from './VDatePicker.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDatePickerSlots } from './VDatePicker.base';
import type { GenericProps } from '@/engines/vue';

export { makeVDatePickerProps, VDatePickerSlots } from './VDatePicker.base';

export const VDatePicker = genericVueComponent<new <
  T,
  Multiple extends boolean | 'range' | number | (string & {}) = false,
  TModel = Multiple extends true | number | string
    ? T[]
    : T,
> (
  props: {
    modelValue?: TModel;
    'onUpdate:modelValue'?: (value: TModel) => void;
    multiple?: Multiple;
  },
  slots: VDatePickerSlots
) => GenericProps<typeof props, typeof slots>>()({
  ..._DatePicker,
  renderHeadless: (
    vm,
    {
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
      rootStyles,
      onClickDate,
      onUpdateMonth,
      onUpdateYear,
      onClickNext,
      onClickPrev,
      onClickMonth,
      onClickYear,
    },
    { props, slots },
  ) => {
    return (
      <VPicker
        { ...pickerProps.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={{
          title: () => slots.title?.() ?? (
            <div class="v-date-picker__title">
              { title.value }
            </div>
          ),
          header: () => slots.header ? (
            <VDefaultsProvider
              defaults={{
                VDatePickerHeader: { ...headerProps.value },
              }}
            >
              { slots.header?.(headerProps.value) }
            </VDefaultsProvider>
          ) : (
            <VDatePickerHeader
              key="header"
              { ...datePickerHeaderProps.value }
              { ...headerProps.value }
              onClick={ viewMode.value !== 'month' ? onClickDate : undefined }
              v-slots={{
                ...slots,
                default: undefined,
              }}
            />
          ),
          default: () => (
            <>
              <VDatePickerControls
                { ...datePickerControlsProps.value }
                disabled={ disabled.value }
                text={ text.value }
                onClick:next={ onClickNext }
                onClick:prev={ onClickPrev }
                onClick:month={ onClickMonth }
                onClick:year={ onClickYear }
              />

              <VFadeTransition hideOnLeave>
                { viewMode.value === 'months' ? (
                  <VDatePickerMonths
                    key="date-picker-months"
                    { ...datePickerMonthsProps.value }
                    v-model={ month.value }
                    onUpdate:modelValue={ onUpdateMonth }
                    min={ minDate.value }
                    max={ maxDate.value }
                    year={ year.value }
                  />
                ) : viewMode.value === 'year' ? (
                  <VDatePickerYears
                    key="date-picker-years"
                    { ...datePickerYearsProps.value }
                    v-model={ year.value }
                    onUpdate:modelValue={ onUpdateYear }
                    min={ minDate.value }
                    max={ maxDate.value }
                  />
                ) : (
                  <VDatePickerMonth
                    key="date-picker-month"
                    { ...datePickerMonthProps.value }
                    v-model={ model.value }
                    v-model:month={ month.value }
                    v-model:year={ year.value }
                    onUpdate:month={ onUpdateMonth }
                    onUpdate:year={ onUpdateYear }
                    min={ minDate.value }
                    max={ maxDate.value }
                  />
                )}
              </VFadeTransition>
            </>
          ),
          actions: slots.actions,
        }}
      />
    );
  },
});

export type VDatePicker = InstanceType<typeof VDatePicker>;
