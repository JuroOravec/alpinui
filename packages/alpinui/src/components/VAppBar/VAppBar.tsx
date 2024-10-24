// Components
import { VToolbar } from '@/components/VToolbar/VToolbar';

// Types
import type { VAppBarSlots } from './VAppBar.base';
import { _AppBar } from './VAppBar.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVAppBarProps, VAppBarSlots } from './VAppBar.base';

export const VAppBar = genericVueComponent<VAppBarSlots>()({
  ..._AppBar,

  renderHeadless: (
    vm,
    {
      isCollapsed,
      isFlat,
      vToolbarRef,
      toolbarClasses,
      toolbarStyles,
      toolbarProps,
    },
    { slots, props },
  ) => {
    return (
      <VToolbar
        ref={ vToolbarRef }
        class={ toolbarClasses.value }
        style={ toolbarStyles.value }
        { ...toolbarProps.value }
        collapse={ isCollapsed.value }
        flat={ isFlat.value }
        v-slots={ slots }
      />
    );
  },
});

export type VAppBar = InstanceType<typeof VAppBar>;
