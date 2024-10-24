// Components
import { VScaleTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider';
import { VIcon } from '@/components/VIcon/VIcon';
import { VInput } from '@/components/VInput/VInput';
import { VLoaderSlot } from '@/components/VLoaderSlot/VLoaderSlot';
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular';
import { VSelectionControl } from '@/components/VSelectionControl/VSelectionControl';

// Utilities
import { _Switch } from './VSwitch.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSwitchSlots } from './VSwitch.base';
import type { GenericProps } from '@/engines/vue';

export { makeVSwitchProps, VSwitchSlots } from './VSwitch.base';

export const VSwitch = genericVueComponent<new <T>(
  props: {
    modelValue?: T | null;
    'onUpdate:modelValue'?: (value: T | null) => void;
  },
  slots: VSwitchSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Switch,
  renderHeadless: (
    vm,
    {
      control,
      model,
      id,
      isFocused,
      isForcedColorsModeActive,
      indeterminate,
      loaderColor,
      controlProps,
      inputProps,
      rootClasses,
      rootStyles,
      genThumbDefaults,
      filterInputAttrs,
      onChange,
      focus,
      blur,
      onTrackClick,
    },
    { attrs, props, slots },
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
          }) => {
            const slotProps = {
              model,
              isValid,
            };

            return (
              <VSelectionControl
                ref={ control }
                { ...controlProps.value }
                v-model={ model.value }
                id={ id.value }
                aria-describedby={ messagesId.value }
                type="checkbox"
                onUpdate:modelValue={ onChange }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                onFocus={ focus }
                onBlur={ blur }
                { ...controlAttrs }
              >
                {{
                  ...slots,
                  default: ({ backgroundColorClasses, backgroundColorStyles }) => (
                    <div
                      class={[
                        'v-switch__track',
                        !isForcedColorsModeActive ? backgroundColorClasses.value : undefined,
                      ]}
                      style={ backgroundColorStyles.value }
                      onClick={ onTrackClick }
                    >
                      { slots['track-true'] && (
                        <div key="prepend" class="v-switch__track-true">
                          { slots['track-true'](slotProps) }
                        </div>
                      )}

                      { slots['track-false'] && (
                        <div key="append" class="v-switch__track-false">
                          { slots['track-false'](slotProps) }
                        </div>
                      )}
                    </div>
                  ),
                  input: ({ inputNode, icon, backgroundColorClasses, backgroundColorStyles }) => (
                    <>
                      { inputNode }
                      <div
                        class={[
                          'v-switch__thumb',
                          { 'v-switch__thumb--filled': icon || props.loading },
                          props.inset || isForcedColorsModeActive ? undefined : backgroundColorClasses.value,
                        ]}
                        style={ props.inset ? undefined : backgroundColorStyles.value }
                      >
                        { slots.thumb ? (
                          <VDefaultsProvider
                            defaults={ genThumbDefaults(icon) }
                          >
                            { slots.thumb({ ...slotProps, icon }) }
                          </VDefaultsProvider>
                        ) : (
                          <VScaleTransition>
                            { !props.loading ? (
                              (icon && (
                                <VIcon
                                  key={ String(icon) }
                                  icon={ icon }
                                  size="x-small"
                                />
                              ))) : (
                              <VLoaderSlot
                                name="v-switch"
                                active
                                color={ isValid.value === false ? undefined : loaderColor.value }
                              >
                                { (slotProps) => (
                                  slots.loader
                                    ? slots.loader(slotProps)
                                    : (
                                      <VProgressCircular
                                        active={ slotProps.isActive }
                                        color={ slotProps.color }
                                        indeterminate
                                        size="16"
                                        width="2"
                                      />
                                    )
                                )}
                              </VLoaderSlot>
                            )}
                          </VScaleTransition>
                        )}
                      </div>
                    </>
                  ),
                }}
              </VSelectionControl>
            );
          },
        }}
      </VInput>
    );
  },
});

export type VSwitch = InstanceType<typeof VSwitch>;
