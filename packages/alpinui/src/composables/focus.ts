// Composables
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { EventProp } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

// Types
export interface FocusProps {
  focused: boolean;
  'onUpdate:focused'?: ((focused: boolean) => any) | undefined;
}

// Composables
export const makeFocusProps = propsFactory({
  focused: Boolean,
  'onUpdate:focused': EventProp<[boolean]>(),
}, 'focus');

// TODO(Alpinui)
// TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
//        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
// TODO
export function useFocus(
  vm: HeadlessInstance,
  props: FocusProps,
  name = getCurrentInstanceName(vm)
) {
  const { computed } = vm.reactivity;

  const isFocused = useProxiedModel(vm, props, 'focused');
  const focusClasses = computed((): ClassValue => {
    return ({
      [`${name}--focused`]: isFocused.value,
    });
  });

  function focus() {
    isFocused.value = true;
  }

  function blur() {
    isFocused.value = false;
  }

  return { focusClasses, isFocused, focus, blur };
}
