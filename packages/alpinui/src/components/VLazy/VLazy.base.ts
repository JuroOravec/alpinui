// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RawSlots } from '@/engines/types';

export const makeVLazyProps = propsFactory({
  modelValue: Boolean,
  options: {
    type: Object as PropType<IntersectionObserverInit>,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: undefined,
      rootMargin: undefined,
      threshold: undefined,
    }),
  },

  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps(),
  ...makeTransitionProps({ transition: 'fade-transition' }),
}, 'VLazy');

export interface VLazySlots extends RawSlots {
  default: never;
}

export const _Lazy = defineComponent({
  name: 'VLazy',

  props: makeVLazyProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VLazySlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { dimensionStyles } = useDimension(vm, props);

    const isActive = useProxiedModel(vm, props, 'modelValue');

    function onIntersect(isIntersecting: boolean) {
      if (isActive.value) return;

      isActive.value = isIntersecting;
    }

    const rootClasses = computed(() => normalizeClass([
      'v-lazy',
      classes.value,
    ]));
    const rootStyles = computed(() => normalizeStyle([
      dimensionStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        isActive,
        onIntersect,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
