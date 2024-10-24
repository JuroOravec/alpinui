// TODO MAYBE?

// Utilities
import { h, Transition, TransitionGroup } from 'vue';
import { _MaybeTransition } from './MaybeTransition.base';
import { genericVueComponent } from '@/engines/vue';
import { mergeProps } from '@/util/helpers';

// Types
import type { MaybeTransitionSlots } from './MaybeTransition.base';

export { makeTransitionProps, MaybeTransitionSlots } from './MaybeTransition.base';

export const MaybeTransition = genericVueComponent<MaybeTransitionSlots>()({
  ..._MaybeTransition,
  renderHeadless: (
    vm,
    _,
    { props, slots },
  ) => {
    const { transition, disabled, group, ...rest } = props;

    const {
      component = group ? TransitionGroup : Transition,
      ...customProps
    } = typeof transition === 'object' ? transition : {};

    return h(
      component,
      mergeProps(
        typeof transition === 'string'
          ? { name: disabled ? '' : transition }
          : customProps as any,
        typeof transition === 'string'
          ? {}
          : Object.fromEntries(Object.entries({ disabled, group }).filter(([_, v]) => v !== undefined)),
        rest as any,
      ),
      slots
    );
  },
});

export type MaybeTransition = InstanceType<typeof MaybeTransition>;
