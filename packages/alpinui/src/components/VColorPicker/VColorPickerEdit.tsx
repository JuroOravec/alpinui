// Components
import { VBtn } from '@/components/VBtn';

// Utilities
import { _ColorPickerEdit } from './VColorPickerEdit.base';
import { defineVueComponent } from '@/engines/vue';

export { makeVColorPickerEditProps, VColorPickerEditSlots } from './VColorPickerEdit.base';

const VColorPickerInput = ({ label, ...rest }: any) => {
  return (
    <div
      class="v-color-picker-edit__input"
    >
      <input { ...rest } />
      <span>{ label }</span>
    </div>
  );
};

export const VColorPickerEdit = defineVueComponent({
  ..._ColorPickerEdit,
  renderHeadless: (
    vm,
    { enabledModes, inputs, rootClasses, rootStyles },
    { props },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { inputs.value?.map((props) => (
          <VColorPickerInput { ...props } />
        ))}
        { enabledModes.value.length > 1 && (
          <VBtn
            icon="$unfold"
            size="x-small"
            variant="plain"
            onClick={ () => {
              const mi = enabledModes.value.findIndex((m) => m.name === props.mode);

              vm.emit('update:mode', enabledModes.value[(mi + 1) % enabledModes.value.length].name);
            }}
          />
        )}
      </div>
    );
  },
});

export type VColorPickerEdit = InstanceType<typeof VColorPickerEdit>;
