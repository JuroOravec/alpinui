// Components
import { _Window, makeVWindowProps } from '@/components/VWindow/VWindow.base';

// Composables
import { useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { VTabsSymbol } from './shared';
import type { VWindowSlots } from '@/components/VWindow/VWindow.base';

export const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory']),
}, 'VTabsWindow');

export type VTabsWindowSlots = VWindowSlots;

export const _TabsWindow = defineComponent({
  name: 'VTabsWindow',

  props: makeVTabsWindowProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  slots: makeSlots<VTabsWindowSlots>({
    default: null,
    additional: null,
    prev: null,
    next: null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject } = vm.reactivity;

    const group = inject(VTabsSymbol, null);
    const { classes, styles } = useComponent(vm, props);
    const _model = useProxiedModel(vm, props, 'modelValue');

    const model = computed({
      get() {
        // Always return modelValue if defined
        // or if not within a VTabs group
        if (_model.value != null || !group) return _model.value;

        // If inside of a VTabs, find the currently selected
        // item by id. Item value may be assigned by its index
        return group.items.value.find((item) => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      },
    });

    const windowProps = computed(() => _Window.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-tabs-window',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        model,
        windowProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
