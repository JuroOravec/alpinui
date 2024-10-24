// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export const makeVToolbarTitleProps = propsFactory({
  text: String,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VToolbarTitle');

export type VToolbarTitleSlots = {
  default: never;
  text: never;
}

export const _ToolbarTitle = defineComponent({
  name: 'VToolbarTitle',

  props: makeVToolbarTitleProps(),

  slots: makeSlots<VToolbarTitleSlots>({
    default: null,
    text: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-toolbar-title',
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
