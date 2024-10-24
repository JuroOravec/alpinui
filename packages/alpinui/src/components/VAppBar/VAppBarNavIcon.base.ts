// Components
import { makeVBtnProps } from '@/components/VBtn/VBtn.base';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VBtnSlots } from '@/components/VBtn/VBtn';

export interface VAppBarNavIconSlots extends VBtnSlots {
  /** Empty */
}

export const makeVAppBarNavIconProps = propsFactory({
  ...makeVBtnProps({
    icon: '$menu',
    variant: 'text' as const,
  }),
}, 'VAppBarNavIcon');

export const _AppBarNavIcon = defineComponent({
  name: 'VAppBarNavIcon',

  props: makeVAppBarNavIconProps(),

  slots: makeSlots<VAppBarNavIconSlots>({
    default: null,
    prepend: null,
    append: null,
    loader: null,
  }),

  setupHeadless(props) {
    return {
      expose: {},
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});
