// Utilities
import { toKebabCase } from './helpers';

// Types
import type { ComponentInternalInstance } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export function getCurrentInstanceName(vm: HeadlessInstance) {
  return toKebabCase(vm.aliasName || vm.name);
}

let _uid = 0;
let _map = new WeakMap<ComponentInternalInstance | HTMLElement, number>();
export function getUid(vm: HeadlessInstance) {
  const key = vmUid(vm);
  if (_map.has(key)) return _map.get(key)!;
  else {
    const uid = _uid++;
    _map.set(key, uid);
    return uid;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = new WeakMap();
};

function vmUid(vm: HeadlessInstance) {
  if (vm.type === 'vue') return vm.instance<ComponentInternalInstance>();
  else if (vm.type === 'alpine') return vm.el!;
  else throw Error(`Invalid instance type ${vm.type}`);
};
