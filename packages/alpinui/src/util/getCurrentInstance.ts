// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue';

// Types
import type { AlpineInstance, Data, EmitsOptions } from 'alpine-composition';

export function getCurrentInstanceName(vm: AlpineInstance<Data, Data, EmitsOptions>) {
  return vm?.$aliasName || vm?.$name;
}

let _uid = 0;
let _map = new WeakMap<AlpineInstance<Data, Data, EmitsOptions>, number>();
export function getUid(vm: AlpineInstance<Data, Data, EmitsOptions>) {
  if (_map.has(vm)) return _map.get(vm)!;
  else {
    const uid = _uid++;
    _map.set(vm, uid);
    return uid;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = new WeakMap();
};
