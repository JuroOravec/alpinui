// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { useResizeObserver } from '@/composables/resizeObserver';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';
import type { TemplateRef } from '@/util/helpers';

export const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,

  ...makeComponentProps(),
}, 'VVirtualScrollItem');

export interface VVirtualScrollItemSlots<Renderless extends boolean = false> extends RawSlots {
  default: Renderless extends true ? {
    itemRef: TemplateRef;
  } : never;
}

export const _VirtualScrollItem = defineComponent({
  name: 'VVirtualScrollItem',

  inheritAttrs: false,

  props: makeVVirtualScrollItemProps(),

  emits: {
    'update:height': (height: number) => true,
  },

  slots: makeSlots<VVirtualScrollItemSlots<any>>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { resizeRef, contentRect } = useResizeObserver(vm, undefined, 'border');

    const rootClasses = computed(() => normalizeClass([
      'v-virtual-scroll__item',
      classes.value,
    ]));

    watch(() => contentRect.value?.height, (height) => {
      if (height != null) vm.emit('update:height', height);
    });

    return {
      expose: {},
      renderInput: {
        resizeRef,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
