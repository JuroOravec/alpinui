// Types
import type { Alpine as AlpineType } from 'alpinejs'
import type { InjectionKey } from 'vue'

declare global {
  interface Element {
    _provides?: Record<string | symbol, any>;
  }
}

declare module 'alpinejs' {
  export interface Magics<T> {
    $provide: <T, K = InjectionKey<T> | string | number>(
      key: K,
      value: K extends InjectionKey<infer V> ? V : T
    ) => void;
    $inject: <T = any>(key: InjectionKey<T> | string, defaultVal?: T) => T;
  }
}

export default function AlpineProvideInjectPlugin(Alpine: AlpineType) {
  Alpine.magic('provide', (el) => {
    return (key: symbol | string | number, value: any) => {
      if (!el._provides) el._provides = {}
      el._provides[key] = value
    }
  })

  const injectFn = (
    el: HTMLElement | null,
    key: string | symbol,
    defaultVal: any,
    searchAncestors: boolean,
  ) => {
    let currentEl: HTMLElement | null = el

    while (currentEl) {
      if (currentEl._provides && key in currentEl._provides) {
        return currentEl._provides[key]
      }

      if (searchAncestors) {
        currentEl = currentEl.parentElement
      } else {
        break
      }
    }

    if (defaultVal !== undefined) {
      return defaultVal
    } else {
      throw Error(`[alpine-provide-inject]: Tried to inject undefined key '${key.toString()}'`)
    }
  }

  // NOTE: $inject strictly looks for values in ancestors
  Alpine.magic('inject', (el) => {
    return (key: string | symbol, defaultVal?: any) => injectFn(el.parentElement, key, defaultVal, true)
  })
}
