// Utilities
import { _BreadcrumbsItem } from './VBreadcrumbsItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBreadcrumbsItemSlots } from './VBreadcrumbsItem.base';

export { makeVBreadcrumbsItemProps, VBreadcrumbsItemSlots } from './VBreadcrumbsItem.base';

export const VBreadcrumbsItem = genericVueComponent<VBreadcrumbsItemSlots>()({
  ..._BreadcrumbsItem,
  renderHeadless: (
    vm,
    { isActive, link, rootClasses, rootStyles },
    { slots, props }
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        aria-current={ isActive.value ? 'page' : undefined }
      >
        { /* TODO(Alpinui): Should be possible to render with combo Django+Alpine if/else */ }
        { !link.isLink.value ? slots.default?.() ?? props.title : (
          <a
            class="v-breadcrumbs-item--link"
            href={ link.href.value }
            aria-current={ isActive.value ? 'page' : undefined }
            onClick={ link.navigate }
          >
            { slots.default?.() ?? props.title }
          </a>
        )}
      </props.tag>
    );
  },
});

export type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>;
