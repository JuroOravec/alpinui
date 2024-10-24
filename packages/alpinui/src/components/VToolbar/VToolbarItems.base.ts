// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeVariantProps } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVToolbarItemsProps = propsFactory({
  ...makeComponentProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VToolbarItems');

export interface VToolbarItemsSlots extends RawSlots {
  default: never;
}

export const _ToolbarItems = defineComponent({
  name: 'VToolbarItems',

  props: makeVToolbarItemsProps(),

  slots: makeSlots<VToolbarItemsSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    provideDefaults(vm, {
      VBtn: {
        color: toRef(props, 'color'),
        height: 'inherit',
        variant: toRef(props, 'variant'),
      },
    });

    const rootClasses = computed(() => normalizeClass([
      'v-toolbar-items',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
