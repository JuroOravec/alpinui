// Types
import type { ComponentInternalInstance } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export function useScopeId(vm: HeadlessInstance) {
  if (vm.type === 'vue') {
    const scopeId = vm.instance<ComponentInternalInstance>().vnode.scopeId;
    return { scopeId: scopeId ? { [scopeId]: '' } : undefined };
  } else {
    // useScopeId is NOOP for AlpineJS
    return { scopeId: undefined };
  }
}
