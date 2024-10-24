// Utilities
import { _BottomNavigation } from './VBottomNavigation.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBottomNavigationSlots } from './VBottomNavigation.base';
import type { GenericProps } from '@/engines/vue';

export { makeVBottomNavigationProps, VBottomNavigationSlots } from './VBottomNavigation.base';

export const VBottomNavigation = genericVueComponent<new <T>(
  props: {
    modelValue?: T;
    'onUpdate:modelValue'?: (value: T) => void;
  },
  slots: VBottomNavigationSlots,
) => GenericProps<typeof props, typeof slots>>()({
  ..._BottomNavigation,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { slots, props }) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default && (
          <div class="v-bottom-navigation__content">
            { slots.default() }
          </div>
        )}
      </props.tag>
    );
  },
});

export type VBottomNavigation = InstanceType<typeof VBottomNavigation>;
