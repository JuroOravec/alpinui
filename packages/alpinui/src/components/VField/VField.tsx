// Components
import { VFieldLabel } from './VFieldLabel';
import { VExpandXTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';
import { VLoaderSlot } from '@/components/VLoaderSlot/VLoaderSlot';

// Utilities
import { _Field } from './VField.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VFieldSlot, VFieldSlots } from './VField.base';

export { makeVFieldProps, VFieldSlots } from './VField.base';

export const VField = genericVueComponent<VFieldSlots>()({
  ..._Field,
  renderHeadless: (
    vm,
    {
      hasLabel,
      floatingLabelRef,
      labelRef,
      id,
      isPlainOrUnderlined,
      isOutlined,
      hasAppend,
      hasClear,
      hasPrepend,
      messagesId,
      onClick,
      onKeydownClear,
      rootClasses,
      rootStyles,
      slotProps,
      textColorClasses,
      textColorStyles,
      getInputIconProps,
    },
    { attrs, props, slots },
  ) => {
    const label = () => (
      slots.label
        ? slots.label({
          ...slotProps.value,
          label: props.label,
          props: { for: id.value },
        })
        : props.label
    );

    return (
      <div
        class={[
          { 'v-field--no-label': !label() },
          rootClasses.value,
        ]}
        style={ rootStyles.value }
        onClick={ onClick }
        { ...attrs }
      >
        <div class="v-field__overlay" />

        <VLoaderSlot
          name="v-field"
          active={ !!props.loading }
          color={ props.error ? 'error' : (typeof props.loading === 'string' ? props.loading : props.color) }
          v-slots={{ default: slots.loader as any }}
        />

        { hasPrepend.value && (
          <div key="prepend" class="v-field__prepend-inner">
            { props.prependInnerIcon && (
              <VIcon key="prepend-icon" { ...getInputIconProps('prependInner') } />
            )}

            { slots['prepend-inner']?.(slotProps.value) }
          </div>
        )}

        <div class="v-field__field" data-no-activator="">
          {['filled', 'solo', 'solo-inverted', 'solo-filled'].includes(props.variant) && hasLabel.value && (
            <VFieldLabel
              key="floating-label"
              ref={ floatingLabelRef }
              class={[textColorClasses.value]}
              floating
              for={ id.value }
              style={ textColorStyles.value }
            >
              { label() }
            </VFieldLabel>
          )}

          <VFieldLabel ref={ labelRef } for={ id.value }>
            { label() }
          </VFieldLabel>

          { slots.default?.({
            ...slotProps.value,
            props: {
              id: id.value,
              class: 'v-field__input',
              'aria-describedby': messagesId.value,
            },
            focus,
            blur,
          } as VFieldSlot)}
        </div>

        { hasClear.value && (
          <VExpandXTransition key="clear">
            <div
              class="v-field__clearable"
              v-show={ props.dirty }
              onMousedown={ (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <VDefaultsProvider
                defaults={{
                  VIcon: {
                    icon: props.clearIcon,
                  },
                }}
              >
                { slots.clear
                  ? slots.clear({
                    ...slotProps.value,
                    props: {
                      onKeydown: onKeydownClear,
                      onFocus: focus,
                      onBlur: blur,
                      onClick: props['onClick:clear'],
                    },
                  })
                  : (
                    <VIcon
                      { ...getInputIconProps('clear') }
                      onKeydown={ onKeydownClear }
                      onFocus={ focus }
                      onBlur={ blur }
                    />
                  )}
              </VDefaultsProvider>
            </div>
          </VExpandXTransition>
        )}

        { hasAppend.value && (
          <div key="append" class="v-field__append-inner">
            { slots['append-inner']?.(slotProps.value) }

            { props.appendInnerIcon && (
              <VIcon key="append-icon" { ...getInputIconProps('appendInner') } />
            )}
          </div>
        )}

        <div
          class={[
            'v-field__outline',
            textColorClasses.value,
          ]}
          style={ textColorStyles.value }
        >
          { isOutlined.value && (
            <>
              <div class="v-field__outline__start" />

              { hasLabel.value && (
                <div class="v-field__outline__notch">
                  <VFieldLabel ref={ floatingLabelRef } floating for={ id.value }>
                    { label() }
                  </VFieldLabel>
                </div>
              )}

              <div class="v-field__outline__end" />
            </>
          )}

          { isPlainOrUnderlined.value && hasLabel.value && (
            <VFieldLabel ref={ floatingLabelRef } floating for={ id.value }>
              { label() }
            </VFieldLabel>
          )}
        </div>
      </div>
    );
  },
});

export type VField = InstanceType<typeof VField>;
