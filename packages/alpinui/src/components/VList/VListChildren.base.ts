// Utilities
import { createList } from './list';
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { InternalListItem } from './VList.base';
import type { VListItemSlots } from './VListItem.base';

export type VListChildrenSlots<T> = {
  [K in keyof Omit<VListItemSlots, 'default'>]: VListItemSlots[K] & { item: T }
} & {
  default: never;
  item: { props: InternalListItem['props'] };
  divider: { props: InternalListItem['props'] };
  subheader: { props: InternalListItem['props'] };
  header: { props: InternalListItem['props'] };
}

export const makeVListChildrenProps = propsFactory({
  items: Array as PropType<readonly InternalListItem[]>,
  returnObject: Boolean,
}, 'VListChildren');

export const _ListChildren = defineComponent({
  name: 'VListChildren',

  props: makeVListChildrenProps(),

  slots: makeSlots<VListChildrenSlots<any>>({
    default: null,
    item: null,
    divider: null,
    subheader: null,
    header: null,
    prepend: null,
    append: null,
    title: null,
    subtitle: null,
  }),

  setupHeadless(props, vm) {
    createList(vm);

    return { expose: {}, renderInput: {} };
  },
  renderHeadless: () => null,
});
