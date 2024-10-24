// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVCardActionsProps = makeComponentProps;

export interface VCardActionsSlots extends RawSlots {
  default: never;
}

export const _CardActions = defineComponent({
  name: 'VCardActions',

  props: makeComponentProps(),

  slots: makeSlots<VCardActionsSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    provideDefaults(vm, {
      VBtn: {
        slim: true,
        variant: 'text',
      },
    });

    const rootClasses = computed(() => ([
      'v-card-actions',
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
