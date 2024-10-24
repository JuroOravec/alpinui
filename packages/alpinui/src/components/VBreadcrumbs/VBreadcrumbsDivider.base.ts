// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],

  ...makeComponentProps(),
}, 'VBreadcrumbsDivider');

export interface VBreadcrumbsDividerSlots extends RawSlots {
  default: never;
}

export const _BreadcrumbsDivider = defineComponent({
  name: 'VBreadcrumbsDivider',

  props: makeVBreadcrumbsDividerProps(),

  slots: makeSlots<VBreadcrumbsDividerSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-breadcrumbs-divider',
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
