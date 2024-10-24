// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VBtn } from '@/components/VBtn/VBtn';

// Utilities
import { _Fab } from './VFab.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VFabSlots } from './VFab.base';

export { makeVFabProps, VFabSlots } from './VFab.base';

export const VFab = genericVueComponent<VFabSlots>()({
  ..._Fab,
  renderHeadless: (
    vm,
    {
      btnProps,
      vFabRef,
      rootClasses,
      rootStyles,
      resizeRef,
    },
    { props, slots },
  ) => {
    return (
      <div
        ref={ vFabRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <div class="v-fab__container">
          <MaybeTransition
            appear={ props.appear }
            transition={ props.transition }
          >
            <VBtn
              v-show={ props.active }
              ref={ resizeRef }
              { ...btnProps.value }
              active={ undefined }
              location={ undefined }
              v-slots={ slots }
            />
          </MaybeTransition>
        </div>
      </div>
    );
  },
});

export type VFab = InstanceType<typeof VFab>;
