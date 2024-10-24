// Types
import type { InjectionKey } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

export function injectSelf<T>(vm: HeadlessInstance<any, any>, key: InjectionKey<T> | string): T | undefined
export function injectSelf(vm: HeadlessInstance<any, any>, key: InjectionKey<any> | string) {
  const { provides } = vm;

  if (provides && (key as string | symbol) in provides) {
    // TS doesn't allow symbol as index type
    return provides[key as string];
  }
  return undefined;
}
