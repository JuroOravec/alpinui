// Components
import { VDialogTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VOverlay } from '@/components/VOverlay';

// Utilities
import { _Menu } from './VMenu.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VMenuSlots } from './VMenu.base';

export { makeVMenuProps, VMenuSlots } from './VMenu.base';

// NOTE(Alpinui): We set the default component here to avoid importing it in `.base` file
const menuProps = { ..._Menu.props };
menuProps.transition = { ..._Menu.props.transition, default: VDialogTransition };

export const VMenu = genericVueComponent<VMenuSlots>()({
  ..._Menu,
  props: menuProps,
  renderHeadless: (
    vm,
    {
      isActive,
      id,
      activatorProps,
      overlay,
      overlayProps,
      scopeId,
      rootClasses,
      rootStyles,
      onClickOutside,
      onKeydown,
    },
    { slots },
  ) => {
    return (
      <VOverlay
        ref={ overlay }
        id={ id.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...overlayProps.value }
        v-model={ isActive.value }
        absolute
        activatorProps={ activatorProps.value }
        onClick:outside={ onClickOutside }
        onKeydown={ onKeydown }
        { ...scopeId }
      >
        {{
          activator: slots.activator,
          default: (...args) => (
            <VDefaultsProvider root="VMenu">
              { slots.default?.(...args) }
            </VDefaultsProvider>
          ),
        }}
      </VOverlay>
    );
  },
});

export type VMenu = InstanceType<typeof VMenu>;
