// Components
import { _WindowItem, makeVWindowItemProps } from '@/components/VWindow/VWindowItem.base';

// Composables
import { useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps(),
}, 'VTabsWindowItem');

export interface VTabsWindowItemSlots extends RawSlots {
  default: never;
}

export const _TabsWindowItem = defineComponent({
  name: 'VTabsWindowItem',

  props: makeVTabsWindowItemProps(),

  slots: makeSlots<VTabsWindowItemSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const windowItemProps = computed(() => _WindowItem.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-tabs-window-item',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        windowItemProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
