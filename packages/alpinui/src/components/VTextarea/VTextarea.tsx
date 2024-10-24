// Components
import { VCounter } from '@/components/VCounter/VCounter';
import { VField } from '@/components/VField/VField';
import { VInput } from '@/components/VInput/VInput';

// Directives
import { Intersect } from '@/directives/intersect';

// Utilities
import { _Textarea } from './VTextarea.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTextareaSlots } from './VTextarea.base';

export { makeVTextareaProps, VTextareaSlots } from './VTextarea.base';

export const VTextarea = genericVueComponent<VTextareaSlots>()({
  ..._Textarea,

  directives: { Intersect },

  renderHeadless: (
    vm,
    {
      isActive,
      isFocused,
      counterValue,
      max,
      model,
      inputProps,
      fieldProps,
      vInputRef,
      vFieldRef,
      textareaRef,
      fieldStyles,
      rootClasses,
      rootStyles,
      sizerRef,
      onControlMousedown,
      onControlClick,
      onClear,
      onInput,
      onIntersect,
      onFocus,
      blur,
      filterInputAttrs,
    },
    { attrs, props, slots },
  ) => {
    const hasCounter = !!(slots.counter || props.counter || props.counterValue);
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
        centerAffix={ false }
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
              style={ fieldStyles.value }
              onClick={ onControlClick }
              onMousedown={ onControlMousedown }
              onClick:clear={ onClear }
              onClick:prependInner={ props['onClick:prependInner'] }
              onClick:appendInner={ props['onClick:appendInner'] }
              { ...fieldProps.value }
              id={ id.value }
              active={ isActive.value || isDirty.value }
              centerAffix={ false }
              dirty={ isDirty.value || props.dirty }
              disabled={ isDisabled.value }
              focused={ isFocused.value }
              error={ isValid.value === false }
            >
              {{
                ...slots,
                default: ({
                  props: { class: fieldClass, ...slotProps },
                }) => (
                  <>
                    { props.prefix && (
                      <span class="v-text-field__prefix">
                        { props.prefix }
                      </span>
                    )}

                    <textarea
                      ref={ textareaRef }
                      class={ fieldClass }
                      value={ model.value }
                      onInput={ onInput }
                      v-intersect={[{
                        handler: onIntersect,
                      }, null, ['once']]}
                      autofocus={ props.autofocus }
                      readonly={ isReadonly.value }
                      disabled={ isDisabled.value }
                      placeholder={ props.placeholder }
                      rows={ props.rows }
                      name={ props.name }
                      onFocus={ onFocus }
                      onBlur={ blur }
                      { ...slotProps }
                      { ...inputAttrs }
                    />

                    { props.autoGrow && (
                      <textarea
                        class={[
                          fieldClass,
                          'v-textarea__sizer',
                        ]}
                        id={ `${slotProps.id}-sizer` }
                        v-model={ model.value }
                        ref={ sizerRef }
                        readonly
                        aria-hidden="true"
                      />
                    )}

                    { props.suffix && (
                      <span class="v-text-field__suffix">
                        { props.suffix }
                      </span>
                    )}
                  </>
                ),
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

export type VTextarea = InstanceType<typeof VTextarea>;
