// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VBtn } from '@/components/VBtn';
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider';

// Utilities
import { _DatePickerMonth } from './VDatePickerMonth.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDatePickerMonthSlots } from './VDatePickerMonth.base';

export { makeVDatePickerMonthProps, VDatePickerMonthSlots } from './VDatePickerMonth.base';

export const VDatePickerMonth = genericVueComponent<VDatePickerMonthSlots>()({
  ..._DatePickerMonth,
  renderHeadless: (
    vm,
    {
      weekNumbers,
      transition,
      daysRef,
      daysInMonth,
      adapter,
      atMax,
      onClick,
    },
    { props, slots },
  ) => {
    return (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div key="weeks" class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
              <div key="hide-week-days" class="v-date-picker-month__day">&nbsp;</div>
            )}
            { weekNumbers.value.map((week) => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__day--adjacent',
                ]}
              >{ week }</div>
            ))}
          </div>
        )}

        <MaybeTransition name={ transition.value }>
          <div
            ref={ daysRef }
            key={ daysInMonth.value[0].date?.toString() }
            class="v-date-picker-month__days"
          >
            { !props.hideWeekdays && adapter.getWeekdays(props.firstDayOfWeek).map((weekDay) => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__weekday',
                ]}
              >{ weekDay }</div>
            ))}

            { daysInMonth.value.map((item, i) => {
              const slotProps = {
                props: {
                  onClick: () => onClick(item.date),
                },
                item,
                i,
              } as const;

              if (atMax.value && !item.isSelected) {
                item.isDisabled = true;
              }

              return (
                <div
                  class={[
                    'v-date-picker-month__day',
                    {
                      'v-date-picker-month__day--adjacent': item.isAdjacent,
                      'v-date-picker-month__day--hide-adjacent': item.isHidden,
                      'v-date-picker-month__day--selected': item.isSelected,
                      'v-date-picker-month__day--week-end': item.isWeekEnd,
                      'v-date-picker-month__day--week-start': item.isWeekStart,
                    },
                  ]}
                  data-v-date={ !item.isDisabled ? item.isoDate : undefined }
                >

                  { (props.showAdjacentMonths || !item.isAdjacent) && (
                    <VDefaultsProvider
                      defaults={{
                        VBtn: {
                          class: 'v-date-picker-month__day-btn',
                          color: (item.isSelected || item.isToday) && !item.isDisabled
                            ? props.color
                            : undefined,
                          disabled: item.isDisabled,
                          icon: true,
                          ripple: false,
                          text: item.localized,
                          variant: item.isDisabled
                            ? item.isToday ? 'outlined' : 'text'
                            : item.isToday && !item.isSelected ? 'outlined' : 'flat',
                          onClick: () => onClick(item.date),
                        },
                      }}
                    >
                      { slots.day?.(slotProps) ?? (
                        <VBtn { ...slotProps.props } />
                      )}
                    </VDefaultsProvider>
                  )}
                </div>
              );
            })}
          </div>
        </MaybeTransition>
      </div>
    );
  },
});

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>;
