// Components
import { VCounter } from '@/components/VCounter/VCounter';
import { VField } from '@/components/VField/VField';
import { VInput } from '@/components/VInput/VInput';

// Directives
import { Intersect } from '@/directives/intersect';

// Utilities
import { cloneVNode } from 'vue';
import { _TextField } from './VTextField.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTextFieldSlots } from './VTextField.base';

export { makeVTextFieldProps, VTextFieldSlots } from './VTextField.base';

export const VTextField = genericVueComponent<VTextFieldSlots>()({
  ..._TextField,

  directives: { Intersect },

  renderHeadless: (
    vm,
    {
      isActive,
      isFocused,
      counterValue,
      max,
      filterInputAttrs,
      fieldProps,
      inputProps,
      model,
      inputRef,
      vInputRef,
      vFieldRef,
      rootClasses,
      rootStyles,
      onControlMousedown,
      onControlClick,
      onClear,
      onInput,
      onIntersect,
      onFocus,
      blur,
    },
    { attrs, props, slots },
  ) => {
    const hasCounter = !!(slots.counter || (props.counter !== false && props.counter != null));
    const hasDetails = !!(hasCounter || slots.details);
    const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);

    return (
      <VInput
        ref={ vInputRef }
        v-model={ model.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...rootAttrs }
        { ...inputProps.value }
        focused={ isFocused.value }
      >
        {{
          ...slots,
          default: ({
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
          }) => (
            <VField
              ref={ vFieldRef }
              onMousedown={ onControlMousedown }
              onClick={ onControlClick }
              onClick:clear={ onClear }
              onClick:prependInner={ props['onClick:prependInner'] }
              onClick:appendInner={ props['onClick:appendInner'] }
              role={ props.role }
              { ...fieldProps.value }
              id={ id.value }
              active={ isActive.value || isDirty.value }
              dirty={ isDirty.value || props.dirty }
              disabled={ isDisabled.value }
              focused={ isFocused.value }
              centerAffix={ props.centerAffix }
              error={ isValid.value === false }
            >
              {{
                ...slots,
                default: ({
                  props: { class: fieldClass, ...slotProps },
                }) => {
                  const inputNode = (
                    <input
                      ref={ inputRef }
                      value={ model.value }
                      onInput={ onInput }
                      v-intersect={[{
                        handler: onIntersect,
                      }, null, ['once']]}
                      autofocus={ props.autofocus }
                      readonly={ isReadonly.value }
                      disabled={ isDisabled.value }
                      name={ props.name }
                      placeholder={ props.placeholder }
                      size={ 1 }
                      type={ props.type }
                      onFocus={ onFocus }
                      onBlur={ blur }
                      { ...slotProps }
                      { ...inputAttrs }
                    />
                  );

                  return (
                    <>
                      { props.prefix && (
                        <span class="v-text-field__prefix">
                          <span class="v-text-field__prefix__text">
                            { props.prefix }
                          </span>
                        </span>
                      )}

                      { slots.default ? (
                        <div
                          class={ fieldClass }
                          data-no-activator=""
                        >
                          { slots.default() }
                          { inputNode }
                        </div>
                      ) : cloneVNode(inputNode, { class: fieldClass })}

                      { props.suffix && (
                        <span class="v-text-field__suffix">
                          <span class="v-text-field__suffix__text">
                            { props.suffix }
                          </span>
                        </span>
                      )}
                    </>
                  );
                },
              }}
            </VField>
          ),
          details: hasDetails ? (slotProps) => (
            <>
              { slots.details?.(slotProps) }

              { hasCounter && (
                <>
                  <span />

                  <VCounter
                    active={ props.persistentCounter || isFocused.value }
                    value={ counterValue.value }
                    max={ max.value }
                    disabled={ props.disabled }
                    v-slots:default={ slots.counter }
                  />
                </>
              )}
            </>
          ) : undefined,
        }}
      </VInput>
    );
  },
});

export type VTextField = InstanceType<typeof VTextField>;
