// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVFieldLabelProps = propsFactory({
  floating: Boolean,

  ...makeComponentProps(),
}, 'VFieldLabel');

export interface VFieldLabelSlots extends RawSlots {
  default: never;
}

export const _FieldLabel = defineComponent({
  name: 'VFieldLabel',

  props: makeVFieldLabelProps(),

  slots: makeSlots<VFieldLabelSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-field-label',
      { 'v-field-label--floating': props.floating },
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
