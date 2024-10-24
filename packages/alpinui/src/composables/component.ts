// Utilities
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { PropType, StyleValue } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export type ClassValue = string | ClassValue[] | Record<string, boolean> | undefined | null;

export interface ComponentProps {
  class?: ClassValue;
  style?: StyleValue | undefined;
}

// Composables
export const makeComponentProps = propsFactory({
  class: [String, Array, Object] as PropType<ClassValue>,
  style: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: null,
  },
}, 'component');

// TODO(Alpinui) - USE THIS IN ALL COMPONENTS!
export function useComponent(
  vm: HeadlessInstance,
  props: ComponentProps,
) {
  const { computed } = vm.reactivity;

  const classes = computed(() => normalizeClass(props.class));
  const styles = computed(() => normalizeStyle(props.style));

  return {
    classes,
    styles,
  };
}
