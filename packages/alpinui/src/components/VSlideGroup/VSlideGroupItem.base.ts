// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group';

// Utilities
import { VSlideGroupSymbol } from './VSlideGroup.base';
import { defineComponent } from '@/util/defineComponent';
import { makeSlots } from '@/util/slots';

// Types
import type { UnwrapRef } from 'vue';
import type { GroupItemProvide } from '@/composables/group';

export type VSlideGroupItemSlots = {
  default: {
    isSelected: UnwrapRef<GroupItemProvide['isSelected']>;
    select: GroupItemProvide['select'];
    toggle: GroupItemProvide['toggle'];
    selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>;
  };
}

export const makeVSlideGroupItemProps = makeGroupItemProps;

export const _SlideGroupItem = defineComponent({
  name: 'VSlideGroupItem',

  props: makeVSlideGroupItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  slots: makeSlots<VSlideGroupItemSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const slideGroupItem = useGroupItem(vm, props, VSlideGroupSymbol);

    return {
      expose: {},
      renderInput: {
        slideGroupItem,
      },
    };
  },
  renderHeadless: () => null,
});
