// Components
import { VInput } from '@/components/VInput/VInput';
import { VLabel } from '@/components/VLabel';
import { VSelectionControlGroup } from '@/components/VSelectionControlGroup/VSelectionControlGroup';

// Utilities
import { _RadioGroup } from './VRadioGroup.base';
import { genericVueComponent } from '@/engines/vue';
import { filterInputAttrs } from '@/util/helpers';

// Types
import type { VRadioGroupSlots } from './VRadioGroup.base';
import type { GenericProps } from '@/engines/vue';

export { makeVRadioGroupProps, VRadioGroupSlots } from './VRadioGroup.base';

export const VRadioGroup = genericVueComponent<new <T>(
  props: {
    modelValue?: T | null;
    'onUpdate:modelValue'?: (value: T | null) => void;
  },
  slots: VRadioGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._RadioGroup,
  renderHeadless: (
    vm,
    {
      id,
      model,
      inputProps,
      controlProps,
      rootClasses,
      rootStyles,
    },
    { attrs, props, slots },
  ) => {
    const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
    const label = slots.label
      ? slots.label({
        label: props.label,
        props: { for: id.value },
      })
      : props.label;

    return (
      <VInput
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...rootAttrs }
        { ...inputProps.value }
        v-model={ model.value }
        id={ id.value }
      >
        {{
          ...slots,
          default: ({
            id,
            messagesId,
            isDisabled,
            isReadonly,
          }) => (
            <>
              { label && (
                <VLabel id={ id.value }>
                  { label }
                </VLabel>
              )}

              <VSelectionControlGroup
                { ...controlProps.value }
                id={ id.value }
                aria-describedby={ messagesId.value }
                defaultsTarget="VRadio"
                trueIcon={ props.trueIcon }
                falseIcon={ props.falseIcon }
                type={ props.type }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                aria-labelledby={ label ? id.value : undefined }
                multiple={ false }
                { ...controlAttrs }
                v-model={ model.value }
                v-slots={ slots }
              />
            </>
          ),
        }}
      </VInput>
    );
  },
});

export type VRadioGroup = InstanceType<typeof VRadioGroup>;
