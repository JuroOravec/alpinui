// Components
import { makeVToolbarTitleProps } from '@/components/VToolbar/VToolbarTitle.base';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { makeSlots } from '@/util/slots';

// Types
import type { VToolbarTitleSlots } from '@/components/VToolbar/VToolbarTitle.base';

export const makeVAppBarTitleProps = makeVToolbarTitleProps;

export interface VAppBarTitleSlots extends VToolbarTitleSlots {
  /** Empty */
}

export const _AppBarTitle = defineComponent({
  name: 'VAppBarTitle',

  props: makeVAppBarTitleProps(),

  slots: makeSlots<VAppBarTitleSlots>({
    default: null,
    text: null,
  }),

  setupHeadless(props, vm) {
    return {
      expose: {},
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});
