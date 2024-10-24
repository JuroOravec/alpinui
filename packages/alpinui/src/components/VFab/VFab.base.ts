// Styles
import './VFab.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';
import { _Btn, makeVBtnProps } from '@/components/VBtn/VBtn.base';

// Composables
import { useComponent } from '@/composables/component';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';
import { makeLocationProps } from '@/composables/location';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useResizeObserver } from '@/composables/resizeObserver';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComputedRef } from 'vue';
import type { Position } from '@/composables/layout';
import type { RawSlots } from '@/engines/types';

export const makeVFabProps = propsFactory({
  app: Boolean,
  appear: Boolean,
  extended: Boolean,
  layout: Boolean,
  offset: Boolean,
  modelValue: {
    type: Boolean,
    default: true,
  },

  ...omit(makeVBtnProps({ active: true }), ['location']),
  ...makeLayoutItemProps(),
  ...makeLocationProps(),
  ...makeTransitionProps({ transition: 'fab-transition' }),
}, 'VFab');

export interface VFabSlots extends RawSlots {
  default: never;
}

export const _Fab = defineComponent({
  name: 'VFab',

  props: makeVFabProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VFabSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, shallowRef, toRef, watchEffect } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const height = shallowRef(56);
    const layoutItemStyles = ref();

    const { resizeRef } = useResizeObserver(vm, (entries) => {
      if (!entries.length) return;
      height.value = entries[0].target.clientHeight;
    });

    const hasPosition = computed(() => props.app || props.absolute);

    const position = computed(() => {
      if (!hasPosition.value) return false;

      return props.location?.split(' ').shift() ?? 'bottom';
    }) as ComputedRef<Position>;

    const orientation = computed(() => {
      if (!hasPosition.value) return false;

      return props.location?.split(' ')[1] ?? 'end';
    });

    const layout = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position,
      layoutSize: computed(() => props.layout ? height.value + 24 : 0),
      elementSize: computed(() => height.value + 24),
      active: computed(() => props.app && model.value),
      absolute: toRef(props, 'absolute'),
    });

    // NOTE(Alpinui): Refactored from useToggleScope
    watchEffect(() => {
      // Touch
      /* eslint-disable no-unused-expressions */
      layoutItemStyles.value;
      layout.layoutItemStyles.value;
      /* eslint-enable no-unused-expressions */

      if (!props.app) return;

      layoutItemStyles.value = layout.layoutItemStyles.value;
    });

    const vFabRef = ref();

    const btnProps = computed(() => _Btn.filterProps(props));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-fab',
      {
        'v-fab--absolute': props.absolute,
        'v-fab--app': !!props.app,
        'v-fab--extended': props.extended,
        'v-fab--offset': props.offset,
        [`v-fab--${position.value}`]: hasPosition.value,
        [`v-fab--${orientation.value}`]: hasPosition.value,
      },
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      props.app ? {
        ...layoutItemStyles.value,
      } : {
        height: 'inherit',
        width: undefined,
      },
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        btnProps,
        vFabRef,
        resizeRef,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
