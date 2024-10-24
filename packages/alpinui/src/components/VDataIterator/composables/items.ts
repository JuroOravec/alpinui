// Utilities
import { getPropertyFromItem } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType } from 'vue';
import type { GroupableItem } from '@/components/VDataTable/composables/group';
import type { SelectableItem } from '@/components/VDataTable/composables/select';
import type { HeadlessInstance } from '@/engines/types';
import type { SelectItemKey } from '@/util/helpers';

export interface DataIteratorItemProps {
  items: any[];
  itemValue: SelectItemKey;
  itemSelectable: SelectItemKey;
  returnObject: boolean;
}

export interface DataIteratorItem<T = any> extends GroupableItem<T>, SelectableItem {
  value: unknown;
}

// Composables
export const makeDataIteratorItemsProps = propsFactory({
  items: {
    type: Array as PropType<DataIteratorItemProps['items']>,
    default: () => ([]),
  },
  itemValue: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'id',
  },
  itemSelectable: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: null,
  },
  returnObject: Boolean,
}, 'DataIterator-items');

export function transformItem(
  props: Omit<DataIteratorItemProps, 'items'>,
  item: any
): DataIteratorItem {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);

  return {
    type: 'item',
    value,
    selectable,
    raw: item,
  };
}

export function transformItems(
  props: Omit<DataIteratorItemProps, 'items'>,
  items: DataIteratorItemProps['items']
) {
  const array: DataIteratorItem[] = [];

  for (const item of items) {
    array.push(transformItem(props, item));
  }

  return array;
}

export function useDataIteratorItems(vm: HeadlessInstance, props: DataIteratorItemProps) {
  const { computed } = vm.reactivity;
  const items = computed(() => transformItems(props, props.items));

  return { items };
}
