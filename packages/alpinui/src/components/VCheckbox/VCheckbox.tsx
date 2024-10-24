// Components
import { VCheckboxBtn } from './VCheckboxBtn';
import { VInput } from '@/components/VInput/VInput';

// Utilities
import { _Checkbox } from './VCheckbox.base';
import { genericVueComponent } from '@/engines/vue';
import { filterInputAttrs } from '@/util/helpers';

// Types
import type { VCheckboxSlots } from './VCheckbox.base';
import type { GenericProps } from '@/engines/vue';

export { makeVCheckboxProps, VCheckboxSlots } from './VCheckbox.base';

export const VCheckbox = genericVueComponent<new <T>(
  props: {
    modelValue?: T | null;
    'onUpdate:modelValue'?: (value: T | null) => void;
  },
  slots: VCheckboxSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Checkbox,
  renderHeadless: (
    vm,
    {
      inputProps,
      checkboxProps,
      id,
      isFocused,
      model,
      rootClasses,
      rootStyles,
      focus,
      blur,
    },
    { attrs, slots },
  ) => {
    const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);

    return (
      <VInput
        class={ rootClasses.value }
        { ...rootAttrs }
        { ...inputProps.value }
        v-model={ model.value }
        id={ id.value }
        focused={ isFocused.value }
        style={ rootStyles.value }
      >
        {{
          ...slots,
          default: ({
            id,
            messagesId,
            isDisabled,
            isReadonly,
            isValid,
          }) => (
            <VCheckboxBtn
              { ...checkboxProps.value }
              id={ id.value }
              aria-describedby={ messagesId.value }
              disabled={ isDisabled.value }
              readonly={ isReadonly.value }
              { ...controlAttrs }
              error={ isValid.value === false }
              v-model={ model.value }
              onFocus={ focus }
              onBlur={ blur }
              v-slots={ slots }
            />
          ),
        }}
      </VInput>
    );
  },
});

export type VCheckbox = InstanceType<typeof VCheckbox>;
