// Components
import { VBtn } from '@/components/VBtn';

// Utilities
import { _DatePickerYears } from './VDatePickerYears.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDatePickerYearsSlots } from './VDatePickerYears.base';

export { makeVDatePickerYearsProps, VDatePickerYearsSlots } from './VDatePickerYears.base';

export const VDatePickerYears = genericVueComponent<VDatePickerYearsSlots>()({
  ..._DatePickerYears,
  renderHeadless: (
    vm,
    {
      model,
      years,
      yearRef,
      onYearClick,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <div
        class="v-date-picker-years"
        style={ rootStyles.value }
      >
        <div class="v-date-picker-years__content">
          { years.value.map((year, i) => {
            const btnProps = {
              ref: model.value === year.value ? yearRef : undefined,
              active: model.value === year.value,
              color: model.value === year.value ? props.color : undefined,
              rounded: true,
              text: year.text,
              variant: model.value === year.value ? 'flat' : 'text',
              onClick: () => onYearClick(year),
            } as const;

            return slots.year?.({
              year,
              i,
              props: btnProps,
            }) ?? (
              <VBtn
                key="month"
                { ...btnProps }
              />
            );
          })}
        </div>
      </div>
    );
  },
});

export type VDatePickerYears = InstanceType<typeof VDatePickerYears>;
