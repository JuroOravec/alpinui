// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVCardTextProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCardText');

export interface VCardTextSlots extends RawSlots {
  default: never;
}

export const _CardText = defineComponent({
  name: 'VCardText',

  props: makeVCardTextProps(),

  slots: makeSlots<VCardTextSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-card-text',
      classes.value,
    ]));
    const rootStyles = computed(() => normalizeStyle([
      { '--v-card-text-opacity': props.opacity },
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
