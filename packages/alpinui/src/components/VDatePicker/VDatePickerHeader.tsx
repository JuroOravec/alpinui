// Components
import { MaybeTransition } from '@/components/MaybeTransition';
import { VBtn } from '@/components/VBtn';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';

// Utilities
import { _DatePickerHeader } from './VDatePickerHeader.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDatePickerHeaderSlots } from './VDatePickerHeader.base';

export { makeVDatePickerHeaderProps, VDatePickerHeaderSlots } from './VDatePickerHeader.base';

export const VDatePickerHeader = genericVueComponent<VDatePickerHeaderSlots>()({
  ..._DatePickerHeader,
  renderHeadless: (
    vm,
    {
      rootClasses,
      backgroundColorStyles,
      onClick,
      onClickAppend,
    },
    { props, slots },
  ) => {
    const hasContent = !!(slots.default || props.header);
    const hasAppend = !!(slots.append || props.appendIcon);

    return (
      <div
        class={ rootClasses.value }
        style={ backgroundColorStyles.value }
        onClick={ onClick }
      >
        { slots.prepend && (
          <div key="prepend" class="v-date-picker-header__prepend">
            { slots.prepend() }
          </div>
        )}

        { hasContent && (
          <MaybeTransition key="content" name={ props.transition }>
            <div key={ props.header } class="v-date-picker-header__content">
              { slots.default?.() ?? props.header }
            </div>
          </MaybeTransition>
        )}

        { hasAppend && (
          <div class="v-date-picker-header__append">
            { !slots.append ? (
              <VBtn
                key="append-btn"
                icon={ props.appendIcon }
                variant="text"
                onClick={ onClickAppend }
              />
            ) : (
              <VDefaultsProvider
                key="append-defaults"
                disabled={ !props.appendIcon }
                defaults={{
                  VBtn: {
                    icon: props.appendIcon,
                    variant: 'text',
                  },
                }}
              >
                { slots.append?.() }
              </VDefaultsProvider>
            )}
          </div>
        )}
      </div>
    );
  },
});

export type VDatePickerHeader = InstanceType<typeof VDatePickerHeader>;
