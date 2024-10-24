// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeGroupItemProps, useGroupItem } from '@/composables/group';
import { makeLazyProps, useLazy } from '@/composables/lazy';
import { useSsrBoot } from '@/composables/ssrBoot';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { convertToUnit, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import { VWindowGroupSymbol, VWindowSymbol } from './VWindow.base';
import type { RawSlots, Slots } from '@/engines/types';

export const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: undefined,
  },
  transition: {
    type: [Boolean, String],
    default: undefined,
  },

  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps(),
}, 'VWindowItem');

export interface VWindowItemSlots extends RawSlots {
  default: never;
}

export const _WindowItem = defineComponent({
  name: 'VWindowItem',

  props: makeVWindowItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  slots: {
    default: () => {},
  } as Slots<VWindowItemSlots>,

  setupHeadless(props, vm) {
    const { computed, inject, nextTick, shallowRef } = vm.reactivity;

    const window = inject(VWindowSymbol);
    const { classes, styles } = useComponent(vm, props);
    const groupItem = useGroupItem(vm, props, VWindowGroupSymbol);
    const { isBooted } = useSsrBoot(vm);

    if (!window || !groupItem) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');

    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (
      window.isReversed.value
        ? props.reverseTransition !== false
        : props.transition !== false
    ));

    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }

      // Finalize transition state.
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;

        // Remove container height if we are out of transition.
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = undefined;
        }
      }
    }

    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      }

      // Initialize transition state here.
      isTransitioning.value = true;

      if (window.transitionCount.value === 0) {
        // Set initial height for height transition.
        window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
      }

      window.transitionCount.value += 1;
    }

    function onTransitionCancelled() {
      onAfterTransition(); // This should have the same path as normal transition end.
    }

    function onEnterTransition(el: Element) {
      if (!isTransitioning.value) {
        return;
      }

      nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }

        // Set transition target height.
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }

    const transition = computed(() => {
      const name = window.isReversed.value
        ? props.reverseTransition
        : props.transition;

      return !hasTransition.value ? false : {
        name: typeof name !== 'string' ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition,
      };
    });

    const { hasContent } = useLazy(vm, props, groupItem.isSelected);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-window-item',
      groupItem.selectedClass.value,
      classes.value,
    ]));

    return {
      expose: {
        groupItem,
      },
      renderInput: {
        transition,
        isBooted,
        groupItem,
        hasContent,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
