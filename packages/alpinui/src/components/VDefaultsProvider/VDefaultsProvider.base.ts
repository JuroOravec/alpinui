// Composables
import { provideDefaults } from '@/composables/defaults';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { DefaultsOptions } from '@/composables/defaults';
import type { RawSlots } from '@/engines/types';

export const makeVDefaultsProviderProps = propsFactory({
  defaults: Object as PropType<DefaultsOptions>,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean,
}, 'VDefaultsProvider');

export interface VDefaultsProviderSlots extends RawSlots {
  default: never;
}

export const _DefaultsProvider = defineComponent({
  name: 'VDefaultsProvider',

  props: makeVDefaultsProviderProps(),
  exposeDefaults: false,

  slots: makeSlots<VDefaultsProviderSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { toRefs } = vm.reactivity;
    const { defaults, disabled, reset, root, scoped } = toRefs(props);

    provideDefaults(vm, defaults, {
      reset,
      root,
      scoped,
      disabled,
    });

    return {
      expose: {},
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});
