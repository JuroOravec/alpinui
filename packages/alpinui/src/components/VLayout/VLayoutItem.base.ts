// Styles
import './VLayoutItem.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { RawSlots } from '@/engines/types';

export const makeVLayoutItemProps = propsFactory({
  position: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 300,
  },
  modelValue: Boolean,

  ...makeComponentProps(),
  ...makeLayoutItemProps(),
}, 'VLayoutItem');

export interface VLayoutItemSlots extends RawSlots {
  default: never;
}

export const _LayoutItem = defineComponent({
  name: 'VLayoutItem',

  props: makeVLayoutItemProps(),

  slots: makeSlots<VLayoutItemSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { layoutItemStyles, layoutIsReady } = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, 'position'),
      elementSize: toRef(props, 'size'),
      layoutSize: toRef(props, 'size'),
      active: toRef(props, 'modelValue'),
      absolute: toRef(props, 'absolute'),
    });

    const rootClasses = computed(() => normalizeClass([
      'v-layout-item',
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      layoutItemStyles.value,
      styles.value,
    ]));

    return {
      expose: layoutIsReady,
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
