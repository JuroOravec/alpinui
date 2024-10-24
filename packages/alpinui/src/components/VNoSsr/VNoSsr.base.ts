// Composables
import { useHydration } from '@/composables/hydration';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export interface VNoSsrSlots extends RawSlots {
  default: never;
}

export const _NoSsr = defineComponent({
  name: 'VNoSsr',

  props: {},

  slots: makeSlots<VNoSsrSlots>({
    default: null,
  }),

  setupHeadless(_, vm) {
    const show = useHydration(vm);

    return {
      expose: {},
      renderInput: {
        show,
      },
    };
  },
  renderHeadless: () => null,
});
