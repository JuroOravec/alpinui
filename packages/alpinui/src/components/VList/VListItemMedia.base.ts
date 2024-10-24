// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVListItemMediaProps = propsFactory({
  start: Boolean,
  end: Boolean,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListItemMedia');

export interface VListItemMediaSlots extends RawSlots {
  default: never;
}

export const _ListItemMedia = defineComponent({
  name: 'VListItemMedia',

  props: makeVListItemMediaProps(),

  slots: makeSlots<VListItemMediaSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-list-item-media',
      {
        'v-list-item-media--start': props.start,
        'v-list-item-media--end': props.end,
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
