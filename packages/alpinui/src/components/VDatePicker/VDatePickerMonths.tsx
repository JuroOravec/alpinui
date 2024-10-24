// Components
import { VBtn } from '@/components/VBtn';

// Utilities
import { _DatePickerMonths } from './VDatePickerMonths.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDatePickerMonthsSlots } from './VDatePickerMonths.base';

export { makeVDatePickerMonthsProps, VDatePickerMonthsSlots } from './VDatePickerMonths.base';

export const VDatePickerMonths = genericVueComponent<VDatePickerMonthsSlots>()({
  ..._DatePickerMonths,
  renderHeadless: (
    vm,
    { months, model, onClick, rootStyles },
    { props, slots },
  ) => {
    return (
      <div
        class="v-date-picker-months"
        style={ rootStyles.value }
      >
        <div class="v-date-picker-months__content">
          { months.value.map((month, i) => {
            const btnProps = {
              active: model.value === i,
              color: model.value === i ? props.color : undefined,
              disabled: month.isDisabled,
              rounded: true,
              text: month.text,
              variant: model.value === month.value ? 'flat' : 'text',
              onClick: () => onClick(i),
            } as const;

            return slots.month?.({
              month,
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

export type VDatePickerMonths = InstanceType<typeof VDatePickerMonths>;
