// Components
import { VIcon } from '@/components/VIcon/VIcon';
import { VMessages } from '@/components/VMessages/VMessages';

// Utilities
import { _Input } from './VInput.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VInputSlots } from './VInput.base';
import type { GenericProps } from '@/engines/vue';

export { makeVInputProps, VInputSlots, VInputSlot } from './VInput.base';

export const VInput = genericVueComponent<new <T>(
  props: {
    modelValue?: T | null;
    'onUpdate:modelValue'?: (value: T | null) => void;
  },
  slots: VInputSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Input,
  renderHeadless: (
    vm,
    {
      hasAppend,
      hasDetails,
      hasMessages,
      hasPrepend,
      messages,
      messagesId,
      rootClasses,
      rootStyles,
      slotProps,
      getInputIconProps,
    },
    { props, slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasPrepend.value && (
          <div key="prepend" class="v-input__prepend">
            { slots.prepend?.(slotProps.value) }

            { props.prependIcon && (
              <VIcon
                key="prepend-icon"
                { ...getInputIconProps('prepend') }
              />
            )}
          </div>
        )}

        { slots.default && (
          <div class="v-input__control">
            { slots.default?.(slotProps.value) }
          </div>
        )}

        { hasAppend.value && (
          <div key="append" class="v-input__append">
            { props.appendIcon && (
              <VIcon
                key="append-icon"
                { ...getInputIconProps('append') }
              />
            )}

            { slots.append?.(slotProps.value) }
          </div>
        )}

        { hasDetails.value && (
          <div class="v-input__details">
            <VMessages
              id={ messagesId.value }
              active={ hasMessages.value }
              messages={ messages.value }
              v-slots={{ message: slots.message }}
            />

            { slots.details?.(slotProps.value) }
          </div>
        )}
      </div>
    );
  },
});

export type VInput = InstanceType<typeof VInput>;
