// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { convertToUnit, destructComputed, includes } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { AlpineInstance, Data, EmitsOptions } from 'alpine-composition';

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
  vm: AlpineInstance<Data, Data, EmitsOptions>,
  props: SizeProps,
  name = getCurrentInstanceName(vm),
) {
  return destructComputed(() => {
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name}--size-${props.size}`;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size),
      };
    }
    return { sizeClasses, sizeStyles };
  });
}
