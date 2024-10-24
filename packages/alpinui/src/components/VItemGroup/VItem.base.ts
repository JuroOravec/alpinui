// Composables
import { VItemGroupSymbol } from './VItemGroup.base';
import { makeGroupItemProps, useGroupItem } from '@/composables/group';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { makeSlots } from '@/util/slots';

export const makeVItemProps = makeGroupItemProps;

export type VItemSlots = {
  default: {
    isSelected: boolean | undefined;
    // NOTE(Alpinui): Changed type of selectedClass
    selectedClass: string | undefined;
    select: ((value: boolean) => void) | undefined;
    toggle: (() => void) | undefined;
    value: unknown;
    disabled: boolean | undefined;
  };
}

export const _Item = defineComponent({
  name: 'VItem',

  props: makeVItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  slots: makeSlots<VItemSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { isSelected, select, toggle, selectedClass, value, disabled } = useGroupItem(vm, props, VItemGroupSymbol);

    return {
      expose: {},
      renderInput: {
        isSelected,
        selectedClass,
        select,
        toggle,
        value,
        disabled,
      },
    };
  },
  renderHeadless: () => null,
});
