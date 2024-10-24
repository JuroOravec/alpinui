// Types
import type { Alpine as AlpineType } from 'alpinejs';
import type { InjectionKey } from 'vue';

declare module 'alpinejs' {
  export interface Magics<T> {
    // These magics come from alpine-alpine
    $Alpine: AlpineType;

    // These magics come from alpine-provide-inject
    $provide: <T, K = InjectionKey<T> | string | number>(
      key: K,
      value: K extends InjectionKey<infer V> ? V : T
    ) => void;
    $inject: <T = any>(key: InjectionKey<T> | string, defaultVal?: T) => T;
  }
}
