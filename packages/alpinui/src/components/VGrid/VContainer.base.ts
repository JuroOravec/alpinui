// Styles
import './VGrid.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { useRtl } from '@/composables/locale';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false,
  },

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VContainer');

export interface VContainerSlots extends RawSlots {
  default: never;
}

export const _Container = defineComponent({
  name: 'VContainer',

  props: makeVContainerProps(),

  slots: makeSlots<VContainerSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { rtlClasses } = useRtl(vm);

    const rootClasses = computed(() => normalizeClass([
      'v-container',
      { 'v-container--fluid': props.fluid },
      rtlClasses.value,
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
