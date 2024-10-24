// Components
import { VToolbarTitle } from '@/components/VToolbar/VToolbarTitle';

// Types
import type { VAppBarTitleSlots } from './VAppBarTitle.base';
import { _AppBarTitle } from './VAppBarTitle.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVAppBarTitleProps, VAppBarTitleSlots } from './VAppBarTitle.base';

export const VAppBarTitle = genericVueComponent<VAppBarTitleSlots>()({
  ..._AppBarTitle,

  renderHeadless: (vm, _, { slots, props }) => (
    <VToolbarTitle
      { ...props }
      class="v-app-bar-title"
      v-slots={ slots }
    />
  ),
});

export type VAppBarTitle = InstanceType<typeof VAppBarTitle>;
