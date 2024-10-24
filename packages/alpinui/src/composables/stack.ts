// Utilities
import { getUid } from '@/util/getCurrentInstance';

// Types
import type { InjectionKey, Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

const StackSymbol: InjectionKey<StackProvide> = Symbol.for('vuetify:stack');

interface StackProvide {
  activeChildren: Set<number | HTMLElement>;
}

// NOTE(Alpinui): In AlpineJS we use element instead of uid
let globalStack: [uid: number | HTMLElement, zIndex: number][] | null = null;

export function useStack(
  vm: HeadlessInstance,
  isActive: Readonly<Ref<boolean>>,
  zIndex: Readonly<Ref<string | number>>,
  disableGlobalStack: boolean
) {
  const { computed, inject, provide, reactive, readonly, shallowRef, toRaw, watch, watchEffect } = vm.reactivity;

  if (globalStack == null) globalStack = reactive([]);

  const createStackEntry = !disableGlobalStack;

  const parent = inject(StackSymbol, undefined);
  const stack = reactive({
    activeChildren: new Set<number | HTMLElement>(),
  } satisfies StackProvide) as StackProvide;
  provide(StackSymbol, stack);

  const _zIndex = shallowRef(+zIndex.value);

  // NOTE(Alpinui): Refactored from `useToggleScope`
  watch(isActive, () => {
    const uid = getUid(vm);

    // Add to stack
    if (isActive.value) {
      const lastZIndex = globalStack!.at(-1)?.[1];
      _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;

      if (createStackEntry) {
        globalStack!.push([uid, _zIndex.value]);
      }

      parent?.activeChildren.add(uid);
    } else {
      // Remove from stack
      if (createStackEntry) {
        const idx = toRaw(globalStack!).findIndex((v) => v[0] === uid);
        globalStack!.splice(idx, 1);
      }

      parent?.activeChildren.delete(uid);
    }
  });

  const globalTop = shallowRef(true);
  if (createStackEntry) {
    watchEffect(() => {
      const uid = getUid(vm);

      const _isTop = globalStack!.at(-1)?.[0] === uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }

  const localTop = computed(() => !stack.activeChildren.size);

  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: computed(() => ({ zIndex: _zIndex.value })),
  };
}
