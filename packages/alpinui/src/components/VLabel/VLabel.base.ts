// Styles
import './VLabel.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeThemeProps } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { EventProp, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVLabelProps = propsFactory({
  text: String,

  onClick: EventProp<[MouseEvent]>(),

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VLabel');

export interface VLabelSlots extends RawSlots {
  default: never;
}

export const _Label = defineComponent({
  name: 'VLabel',

  props: makeVLabelProps(),

  slots: makeSlots<VLabelSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-label',
      {
        'v-label--clickable': !!props.onClick,
      },
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
