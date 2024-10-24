// Composables
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { propsFactory } from '@/util/propsFactory';

// Types
import type { InjectionKey, PropType, Ref } from 'vue';
import type { DataTableItem } from '../types';
import type { HeadlessInstance } from '@/engines/types';

export const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array as PropType<readonly string[]>,
    default: () => ([]),
  },
}, 'DataTable-expand');

export const VDataTableExpandedKey: InjectionKey<{
  expand: (item: DataTableItem, value: boolean) => void;
  expanded: Ref<Set<string>>;
  expandOnClick: Ref<boolean | undefined>;
  isExpanded: (item: DataTableItem) => boolean;
  toggleExpand: (item: DataTableItem) => void;
}> = Symbol.for('vuetify:datatable:expanded');

type ExpandProps = {
  expandOnClick: boolean;
  expanded: readonly string[];
  'onUpdate:expanded'?: ((value: any[]) => void) | undefined;
}

export function provideExpanded(vm: HeadlessInstance, props: ExpandProps) {
  const { provide, toRef } = vm.reactivity;

  const expandOnClick = toRef(props, 'expandOnClick');
  const expanded = useProxiedModel(vm, props, 'expanded', props.expanded, (v) => {
    return new Set(v);
  }, (v) => {
    return [...v.values()];
  });

  function expand(item: DataTableItem, value: boolean) {
    const newExpanded = new Set(expanded.value);

    if (!value) {
      newExpanded.delete(item.value);
    } else {
      newExpanded.add(item.value);
    }

    expanded.value = newExpanded;
  }

  function isExpanded(item: DataTableItem) {
    return expanded.value.has(item.value);
  }

  function toggleExpand(item: DataTableItem) {
    expand(item, !isExpanded(item));
  }

  const data = { expand, expanded, expandOnClick, isExpanded, toggleExpand };

  provide(VDataTableExpandedKey, data);

  return data;
}

export function useExpanded(vm: HeadlessInstance) {
  const { inject } = vm.reactivity;
  const data = inject(VDataTableExpandedKey);

  if (!data) throw new Error('foo');

  return data;
}
