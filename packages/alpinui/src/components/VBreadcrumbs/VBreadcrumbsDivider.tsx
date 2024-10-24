// Utilities
import { _BreadcrumbsDivider } from './VBreadcrumbsDivider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBreadcrumbsDividerSlots } from './VBreadcrumbsDivider.base';

export { makeVBreadcrumbsDividerProps, VBreadcrumbsDividerSlots } from './VBreadcrumbsDivider.base';

export const VBreadcrumbsDivider = genericVueComponent<VBreadcrumbsDividerSlots>()({
  ..._BreadcrumbsDivider,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { slots, props }
  ) => {
    return (
      <li
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots?.default?.() ?? props.divider }
      </li>
    );
  },
});

export type VBreadcrumbsDivider = InstanceType<typeof VBreadcrumbsDivider>;
