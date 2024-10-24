// Composables
import { _BannerActions } from './VBannerActions.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBannerActionsSlots } from './VBannerActions.base';

export { makeVBannerActionsProps, VBannerActionsSlots } from './VBannerActions.base';

export const VBannerActions = genericVueComponent<VBannerActionsSlots>()({
  ..._BannerActions,
  renderHeadless: (vm, { rootClasses, rootStyles }, { slots }) => (
    <div
      class={ rootClasses.value }
      style={ rootStyles.value }
    >
      { slots.default?.() }
    </div>
  ),
});

export type VBannerActions = InstanceType<typeof VBannerActions>;
