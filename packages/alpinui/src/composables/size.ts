// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { convertToUnit, destructComputed, includes } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { StyleValue } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

// Types
const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];

export interface SizeProps {
  size?: string | number;
}

// Composables
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default',
  },
}, 'size');

export function useSize(
  vm: HeadlessInstance,
  props: SizeProps,
  name = getCurrentInstanceName(vm),
) {
  return destructComputed(vm, () => {
    const sizeClasses: ClassValue = {};
    let sizeStyles: Partial<StyleValue> = {};

    if (includes(predefinedSizes, props.size)) {
      sizeClasses[`${name}--size-${props.size}`] = true;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size),
      };
    }
    return { sizeClasses, sizeStyles };
  });
}
