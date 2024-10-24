// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VMenu } from '@/components/VMenu/VMenu';

// Utilities
import { _SpeedDial } from './VSpeedDial.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSpeedDialSlots } from './VSpeedDial.base';

export { makeVSpeedDialProps, VSpeedDialSlots } from './VSpeedDial.base';

export const VSpeedDial = genericVueComponent<VSpeedDialSlots>()({
  ..._SpeedDial,
  renderHeadless: (
    vm,
    {
      contentClasses,
      defaults,
      location,
      model,
      menuProps,
      menuRef,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    return (
      <VMenu
        { ...menuProps.value }
        v-model={ model.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        contentClass={ contentClasses.value }
        location={ location.value }
        ref={ menuRef }
        transition="fade-transition"
      >
        {{
          ...slots,
          default: (slotProps) => (
            <VDefaultsProvider
              defaults={ defaults.value }
            >
              <MaybeTransition
                appear
                group
                transition={ props.transition }
              >
                { slots.default?.(slotProps) }
              </MaybeTransition>
            </VDefaultsProvider>
          ),
        }}
      </VMenu>
    );
  },
});

export type VSpeedDial = InstanceType<typeof VSpeedDial>;
