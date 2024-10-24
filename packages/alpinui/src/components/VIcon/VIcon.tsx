// Utilities
import { _Icon } from './VIcon.base';
import { genericVueComponent } from '@/engines/vue';
import { flattenFragments } from '@/util/vnode';

// Types
import type { VIconSlots } from './VIcon.base';

export { makeVIconProps, VIconSlots } from './VIcon.base';

export const VIcon = genericVueComponent<VIconSlots>()({
  ..._Icon,
  renderHeadless: (
    vm,
    {
      iconData,
      rootClasses,
      rootStyles,
      slotIcon,
    },
    { attrs, props, slots },
  ) => {
    const slotValue = slots.default?.();
    if (slotValue) {
      slotIcon.value = flattenFragments(slotValue).filter((node) =>
        node.type === Text && node.children && typeof node.children === 'string'
      )[0]?.children as string;
    }
    const hasClick = !!(attrs.onClick || attrs.onClickOnce);

    return (
      <iconData.value.component
        tag={ props.tag }
        icon={ iconData.value.icon }
        class={[
          rootClasses.value,
          { 'v-icon--clickable': hasClick },
        ]}
        style={ rootStyles.value }
        role={ hasClick ? 'button' : undefined }
        aria-hidden={ !hasClick }
        tabindex={ hasClick ? props.disabled ? -1 : 0 : undefined }
      >
        { slotValue }
      </iconData.value.component>
    );
  },
});

export type VIcon = InstanceType<typeof VIcon>;
