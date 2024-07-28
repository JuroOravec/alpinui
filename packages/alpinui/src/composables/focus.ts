// Composables
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { computed } from 'alpine-reactivity';
import { getCurrentInstanceName } from '@/util/getCurrentInstance';
import { EventProp } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { AlpineInstance, Data, EmitsOptions } from 'alpine-composition';

// TODO
// TODO
// TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
//        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
// TODO
// TODO

// Types
export interface FocusProps {
  focused: boolean;
  'onUpdate:focused': ((focused: boolean) => any) | undefined;
}

// Composables
export const makeFocusProps = propsFactory({
  focused: Boolean,
  'onUpdate:focused': EventProp<[boolean]>(),
}, 'focus');

export function useFocus(
  vm: AlpineInstance<Data, Data, EmitsOptions>,
  props: FocusProps,
  name = getCurrentInstanceName(vm),
) {
  const isFocused = useProxiedModel(vm, props, 'focused');
  const focusClasses = computed(() => {
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
