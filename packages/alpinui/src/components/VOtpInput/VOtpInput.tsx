// Components
import { VField } from '@/components/VField/VField';
import { VOverlay } from '@/components/VOverlay/VOverlay';
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular';

// Utilities
import { _OtpInput } from './VOtpInput.base';
import { genericVueComponent } from '@/engines/vue';
import { filterInputAttrs } from '@/util/helpers';

// Types
import type { VOtpInputSlots } from './VOtpInput.base';

export { makeVOtpInputProps, VOtpInputSlots } from './VOtpInput.base';

export const VOtpInput = genericVueComponent<VOtpInputSlots>()({
  ..._OtpInput,
  renderHeadless: (
    vm,
    {
      contentRef,
      dimensionStyles,
      fields,
      isFocused,
      focusIndex,
      inputRef,
      model,
      rootClasses,
      rootStyles,
      onBlur,
      onFocus,
      onInput,
      onKeydown,
      onPaste,
      t,
    },
    { attrs, props, slots },
  ) => {
    const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);

    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...rootAttrs }
      >
        <div
          ref={ contentRef }
          class="v-otp-input__content"
          style={ dimensionStyles.value }
        >
          { fields.value.map((_, i) => (
            <>
              { props.divider && i !== 0 && (
                <span class="v-otp-input__divider">{ props.divider }</span>
              )}

              <VField
                focused={ (isFocused.value && props.focusAll) || focusIndex.value === i }
                key={ i }
              >
                {{
                  ...slots,
                  loader: undefined,
                  default: () => {
                    return (
                      <input
                        ref={ (val) => inputRef.value[i] = val as HTMLInputElement }
                        aria-label={ t(props.label, i + 1) }
                        autofocus={ i === 0 && props.autofocus }
                        autocomplete="one-time-code"
                        class="v-otp-input__field"
                        disabled={ props.disabled }
                        inputmode={ props.type === 'number' ? 'numeric' : 'text' }
                        min={ props.type === 'number' ? 0 : undefined }
                        maxlength="1"
                        placeholder={ props.placeholder }
                        type={ props.type === 'number' ? 'text' : props.type }
                        value={ model.value[i] }
                        onInput={ onInput }
                        onFocus={ (e) => onFocus(e, i) }
                        onBlur={ onBlur }
                        onKeydown={ onKeydown }
                        onPaste={ (event) => onPaste(i, event) }
                      />
                    );
                  },
                }}
              </VField>
            </>
          ))}

          <input
            class="v-otp-input-input"
            type="hidden"
            { ...inputAttrs }
            value={ model.value.join('') }
          />

          <VOverlay
            contained
            content-class="v-otp-input__loader"
            model-value={ !!props.loading }
            persistent
          >
            { slots.loader?.() ?? (
              <VProgressCircular
                color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                indeterminate
                size="24"
                width="2"
              />
            )}
          </VOverlay>

          { slots.default?.() }
        </div>
      </div>
    );
  },
});

export type VOtpInput = InstanceType<typeof VOtpInput>;
