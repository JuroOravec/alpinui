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

export const makeVListItemActionProps = propsFactory({
  start: Boolean,
  end: Boolean,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListItemAction');

export interface VListItemActionSlots extends RawSlots {
  default: never;
}

export const _ListItemAction = defineComponent({
  name: 'VListItemAction',

  props: makeVListItemActionProps(),

  slots: makeSlots<VListItemActionSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-list-item-action',
      {
        'v-list-item-action--start': props.start,
        'v-list-item-action--end': props.end,
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
