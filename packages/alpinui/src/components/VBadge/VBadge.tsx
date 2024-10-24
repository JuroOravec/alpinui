// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VIcon } from '@/components/VIcon';

// Types
import type { VBadgeSlots } from './VBadge.base';
import { _Badge } from './VBadge.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVBadgeProps, VBadgeSlots } from './VBadge.base';

export const VBadge = genericVueComponent<VBadgeSlots>()({
  ..._Badge,
  renderHeadless: (
    vm,
    {
      badgeAriaLabel,
      badgeClasses,
      badgeStyles,
      content,
      getBadgeAtts,
      rootClasses,
      styles,
    },
    { slots, props }
  ) => {
    const { badgeAttrs, attrs } = getBadgeAtts();

    const theContent = props.dot
      ? undefined
      : slots.badge
        ? slots.badge?.()
        : props.icon
          ? <VIcon icon={ props.icon } />
          : content.value;

    return (
      <props.tag
        class={ rootClasses.value }
        { ...attrs }
        style={ styles.value }
      >
        <div class="v-badge__wrapper">
          { slots.default?.() }

          <MaybeTransition transition={ props.transition }>
            <span
              v-show={ props.modelValue }
              class={ badgeClasses.value }
              style={ badgeStyles.value }
              aria-atomic="true"
              aria-label={ badgeAriaLabel.value }
              aria-live="polite"
              role="status"
              { ...badgeAttrs }
            >
              { theContent }
            </span>
          </MaybeTransition>
        </div>
      </props.tag>
    );
  },
});

export type VBadge = InstanceType<typeof VBadge>;
