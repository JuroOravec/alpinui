// Components
import { VIcon } from '@/components/VIcon';
import { VLabel } from '@/components/VLabel';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _SelectionControl } from './VSelectionControl.base';
import { genericVueComponent } from '@/engines/vue';
import { filterInputAttrs } from '@/util/helpers';

// Types
import type { SelectionControlSlot, VSelectionControlSlots } from './VSelectionControl.base';
import type { GenericProps } from '@/engines/vue';

export { makeVSelectionControlProps, VSelectionControlSlots, SelectionControlSlot, useSelectionControl } from './VSelectionControl.base';

export const VSelectionControl = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VSelectionControlSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._SelectionControl,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
      wrapperClasses,
      icon,
      id,
      input,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue,
      onBlur,
      onFocus,
      onClickLabel,
      onInput,
    },
    { attrs, props, slots },
  ) => {
    const label = slots.label
      ? slots.label({
        label: props.label,
        props: { for: id.value },
      })
      : props.label;
    const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);

    const inputNode = (
      <input
        ref={ input }
        checked={ model.value }
        disabled={ !!props.disabled }
        id={ id.value }
        onBlur={ onBlur }
        onFocus={ onFocus }
        onInput={ onInput }
        aria-disabled={ !!props.disabled }
        aria-label={ props.label }
        type={ props.type }
        value={ trueValue.value }
        name={ props.name }
        aria-checked={ props.type === 'checkbox' ? model.value : undefined }
        { ...inputAttrs }
      />
    );

    return (
      <div
        class={ rootClasses.value }
        { ...rootAttrs }
        style={ rootStyles.value }
      >
        <div
          class={ wrapperClasses.value }
          style={ textColorStyles.value }
        >
          { slots.default?.({
            backgroundColorClasses,
            backgroundColorStyles,
          })}

          <div
            class="v-selection-control__input"
            v-ripple={ props.ripple && [
              !props.disabled && !props.readonly,
              null,
              ['center', 'circle'],
            ]}
          >
            { slots.input?.({
              model,
              textColorClasses,
              textColorStyles,
              backgroundColorClasses,
              backgroundColorStyles,
              inputNode,
              icon: icon.value,
              props: {
                onFocus,
                onBlur,
                id: id.value,
              },
            } satisfies SelectionControlSlot) ?? (
              <>
                { icon.value && <VIcon key="icon" icon={ icon.value } /> }

                { inputNode }
              </>
            )}
          </div>
        </div>

        { label && (
          <VLabel for={ id.value } onClick={ onClickLabel }>
            { label }
          </VLabel>
        )}
      </div>
    );
  },
});

export type VSelectionControl = InstanceType<typeof VSelectionControl>;
