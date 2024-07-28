// Types
import type { Alpine as AlpineType } from 'alpinejs'

declare module 'alpinejs' {
  export interface Magics<T> {
    $Alpine: AlpineType;
  }
}

export default function AlpineAlpinePlugin(Alpine: AlpineType) {
  Alpine.magic('Alpine', () => {
    return Alpine
  })
}
