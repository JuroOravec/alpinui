// Components
import { VBtn } from '@/components/VBtn/VBtn';

// Types
import type { VAppBarNavIconSlots } from './VAppBarNavIcon.base';
import { _AppBarNavIcon } from './VAppBarNavIcon.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVAppBarNavIconProps, VAppBarNavIconSlots } from './VAppBarNavIcon.base';

export const VAppBarNavIcon = genericVueComponent<VAppBarNavIconSlots>()({
  ..._AppBarNavIcon,

  renderHeadless: (vm, _, { slots, props }) => (
    <VBtn
      { ...props }
      class="v-app-bar-nav-icon"
      v-slots={ slots }
    />
  ),
});

export type VAppBarNavIcon = InstanceType<typeof VAppBarNavIcon>;
