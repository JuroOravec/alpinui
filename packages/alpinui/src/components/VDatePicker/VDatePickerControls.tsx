// Components
import { VBtn } from '@/components/VBtn';
import { VSpacer } from '@/components/VGrid';

// Utilities
import { _DatePickerControls } from './VDatePickerControls.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDatePickerControlsSlots } from './VDatePickerControls.base';

export { makeVDatePickerControlsProps, VDatePickerControlsSlots } from './VDatePickerControls.base';

export const VDatePickerControls = genericVueComponent<VDatePickerControlsSlots>()({
  ..._DatePickerControls,
  renderHeadless: (
    vm,
    {
      disableMonth,
      disableYear,
      disablePrev,
      disableNext,
      onClickMonth,
      onClickYear,
      onClickPrev,
      onClickNext,
    },
    { props, slots },
  ) => {
    // TODO(Vuetify): add slot support and scope defaults
    return (
      <div
        class={[
          'v-date-picker-controls',
        ]}
      >
        <VBtn
          class="v-date-picker-controls__month-btn"
          disabled={ disableMonth.value }
          text={ props.text }
          variant="text"
          rounded
          onClick={ onClickMonth }
        ></VBtn>

        <VBtn
          key="mode-btn"
          class="v-date-picker-controls__mode-btn"
          disabled={ disableYear.value }
          density="comfortable"
          icon={ props.modeIcon }
          variant="text"
          onClick={ onClickYear }
        />

        <VSpacer key="mode-spacer" />

        <div
          key="month-buttons"
          class="v-date-picker-controls__month"
        >
          <VBtn
            disabled={ disablePrev.value }
            icon={ props.prevIcon }
            variant="text"
            onClick={ onClickPrev }
          />

          <VBtn
            disabled={ disableNext.value }
            icon={ props.nextIcon }
            variant="text"
            onClick={ onClickNext }
          />
        </div>
      </div>
    );
  },
});

export type VDatePickerControls = InstanceType<typeof VDatePickerControls>;
