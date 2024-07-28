// Utilities
import { propsFactory } from '@/util/propsFactory';

// Types
import type { CSSProperties, PropType } from 'vue';

export type ClassValue = Record<string, boolean>;

export interface ComponentProps {
  class: ClassValue;
  style: CSSProperties | undefined;
}

// Composables
export const makeComponentProps = propsFactory({
  class: Object as PropType<ClassValue>,
  style: {
    type: Object as PropType<CSSProperties>,
    default: null,
  },
}, 'component');
