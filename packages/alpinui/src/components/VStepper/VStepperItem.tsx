// Components
import { genOverlays } from '@/components/_Overlay';
import { VAvatar } from '@/components/VAvatar';
import { VIcon } from '@/components/VIcon';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _StepperItem } from './VStepperItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VStepperItemSlots } from './VStepperItem.base';

export {
  makeVStepperItemProps,
  makeStepperItemProps,
  VStepperItemSlots,
  StepperItem,
  StepperItemSlot,
  ValidationRule,
} from './VStepperItem.base';

export const VStepperItem = genericVueComponent<VStepperItemSlots>()({
  ..._StepperItem,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      hasColor,
      isClickable,
      icon,
      step,
      slotProps,
      rootClasses,
      onClick,
    },
    { props, slots },
  ) => {
    const hasTitle = !!(props.title != null || slots.title);
    const hasSubtitle = !!(props.subtitle != null || slots.subtitle);

    return (
      <button
        class={ rootClasses.value }
        disabled={ !props.editable }
        v-ripple={[
          props.ripple && props.editable,
          null,
          null,
        ]}
        onClick={ onClick }
      >
        { isClickable.value && genOverlays(true, 'v-stepper-item') }

        <VAvatar
          key="stepper-avatar"
          class="v-stepper-item__avatar"
          color={ hasColor.value ? props.color : undefined }
          size={ 24 }
        >
          { slots.icon?.(slotProps.value) ?? (
            icon.value ? (
              <VIcon icon={ icon.value }></VIcon>
            ) : step.value
          )}
        </VAvatar>

        <div class="v-stepper-item__content">
          { hasTitle && (
            <div
              key="title"
              class="v-stepper-item__title"
            >
              { slots.title?.(slotProps.value) ?? props.title }
            </div>
          )}

          { hasSubtitle && (
            <div
              key="subtitle"
              class="v-stepper-item__subtitle"
            >
              { slots.subtitle?.(slotProps.value) ?? props.subtitle }
            </div>
          )}

          { slots.default?.(slotProps.value) }
        </div>
      </button>
    );
  },
});

export type VStepperItem = InstanceType<typeof VStepperItem>;
