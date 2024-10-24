// Components
import { VChip } from '@/components/VChip/VChip';
import { VCounter } from '@/components/VCounter/VCounter';
import { VField } from '@/components/VField/VField';
import { VInput } from '@/components/VInput/VInput';

// Utilities
import { _FileInput } from './VFileInput.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VFileInputSlots } from './VFileInput.base';

export { makeVFileInputProps, VFileInputSlots } from './VFileInput.base';

export const VFileInput = genericVueComponent<VFileInputSlots>()({
  ..._FileInput,
  renderHeadless: (
    vm,
    {
      isActive,
      isFocused,
      isPlainOrUnderlined,
      model,
      fileNames,
      totalBytes,
      totalBytesReadable,
      counterValue,
      vFieldRef,
      vInputRef,
      inputRef,
      inputProps,
      fieldProps,
      rootClasses,
      rootStyles,
      onClickPrepend,
      onControlClick,
      onControlMousedown,
      onClear,
      onFocus,
      blur,
      filterInputAttrs,
    },
    { attrs, props, slots },
  ) => {
    const hasCounter = !!(slots.counter || props.counter);
    const hasDetails = !!(hasCounter || slots.details);
    const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);

    return (
      <VInput
        ref={ vInputRef }
        v-model={ model.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        onClick:prepend={ onClickPrepend }
        { ...rootAttrs }
        { ...inputProps.value }
        centerAffix={ !isPlainOrUnderlined.value }
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
              prepend-icon={ props.prependIcon }
              onMousedown={ onControlMousedown }
              onClick={ onControlClick }
              onClick:clear={ onClear }
              onClick:prependInner={ props['onClick:prependInner'] }
              onClick:appendInner={ props['onClick:appendInner'] }
              { ...fieldProps.value }
              id={ id.value }
              active={ isActive.value || isDirty.value }
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
                    <input
                      ref={ inputRef }
                      type="file"
                      readonly={ isReadonly.value }
                      disabled={ isDisabled.value }
                      multiple={ props.multiple }
                      name={ props.name }
                      onClick={ (e) => {
                        e.stopPropagation();

                        if (isReadonly.value) e.preventDefault();

                        onFocus();
                      }}
                      onChange={ (e) => {
                        if (!e.target) return;

                        const target = e.target as HTMLInputElement;
                        model.value = [...target.files ?? []];
                      }}
                      onFocus={ onFocus }
                      onBlur={ blur }
                      { ...slotProps }
                      { ...inputAttrs }
                    />

                    <div class={ fieldClass }>
                      { !!model.value?.length && !props.hideInput && (
                        slots.selection ? slots.selection({
                          fileNames: fileNames.value,
                          totalBytes: totalBytes.value,
                          totalBytesReadable: totalBytesReadable.value,
                        })
                        : props.chips ? fileNames.value.map((text) => (
                          <VChip
                            key={ text }
                            size="small"
                            text={ text }
                          />
                        ))
                        : fileNames.value.join(', ')
                      )}
                    </div>
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
                    active={ !!model.value?.length }
                    value={ counterValue.value }
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

export type VFileInput = InstanceType<typeof VFileInput>;
