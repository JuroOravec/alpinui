// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export interface LoaderSlotProps {
  color: string | undefined;
  isActive: boolean;
}

export interface VLoaderSlotSlots extends RawSlots {
  default: LoaderSlotProps;
}

export const makeVLoaderSlotProps = propsFactory({
  absolute: Boolean,
  active: { type: Boolean, required: true },
  name: { type: String, required: true },
  color: String,
}, 'VLoaderSlot');

export const _LoaderSlot = defineComponent({
  name: 'VLoaderSlot',

  props: makeVLoaderSlotProps(),

  slots: makeSlots<VLoaderSlotSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    return {
      expose: {},
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});
