// Components
import { VDialogTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VOverlay } from '@/components/VOverlay';

// Utilities
import { _Dialog } from './VDialog.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VDialogSlots } from './VDialog.base';

export { makeVDialogProps, VDialogSlots } from './VDialog.base';

// NOTE(Alpinui): We have to set the default component here, so we don't
// import Vue stuff into the `VDialog.base` file.
const dialogProps = { ..._Dialog.props };
dialogProps.transition = { ...dialogProps.transition, default: VDialogTransition };

export const VDialog = genericVueComponent<VDialogSlots>()({
  ..._Dialog,
  props: dialogProps,
  renderHeadless: (
    vm,
    {
      activatorProps,
      contentProps,
      overlayProps,
      overlay,
      isActive,
      onAfterEnter,
      onAfterLeave,
      scopeId,
      rootClasses,
      rootStyles,
    },
    { slots },
  ) => {
    return (
      <VOverlay
        ref={ overlay }
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...overlayProps.value }
        v-model={ isActive.value }
        aria-modal="true"
        activatorProps={ activatorProps.value }
        contentProps={ contentProps.value }
        role="dialog"
        onAfterEnter={ onAfterEnter }
        onAfterLeave={ onAfterLeave }
        { ...scopeId }
      >
        {{
          activator: slots.activator,
          default: (...args) => (
            <VDefaultsProvider root="VDialog">
              { slots.default?.(...args) }
            </VDefaultsProvider>
          ),
        }}
      </VOverlay>
    );
  },
});

export type VDialog = InstanceType<typeof VDialog>;
