// Components
import { VPickerTitle } from './VPickerTitle';
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider';
import { VSheet } from '@/components/VSheet/VSheet';

// Utilities
import { _Picker } from './VPicker.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VPickerSlots } from './VPicker.base';

export { makeVPickerProps, VPickerSlots } from './VPicker.base';

export const VPicker = genericVueComponent<VPickerSlots>()({
  ..._Picker,
  renderHeadless: (
    vm,
    {
      backgroundColorClasses,
      backgroundColorStyles,
      sheetProps,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    const hasTitle = !!(props.title || slots.title);

    return (
      <VSheet
        { ...sheetProps.value }
        color={ props.bgColor }
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { !props.hideHeader && (
          <div
            key="header"
            class={[
              backgroundColorClasses.value,
            ]}
            style={[
              backgroundColorStyles.value,
            ]}
          >
            { hasTitle && (
              <VPickerTitle key="picker-title">
                { slots.title?.() ?? props.title }
              </VPickerTitle>
            )}

            { slots.header && (
              <div class="v-picker__header">
                { slots.header() }
              </div>
            )}
          </div>
        )}

        <div class="v-picker__body">
          { slots.default?.() }
        </div>

        { slots.actions && (
          <VDefaultsProvider
            defaults={{
              VBtn: {
                slim: true,
                variant: 'text',
              },
            }}
          >
            <div class="v-picker__actions">
              { slots.actions() }
            </div>
          </VDefaultsProvider>
        )}
      </VSheet>
    );
  },
});

export type VPicker = InstanceType<typeof VPicker>;
