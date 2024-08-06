// Utilities
import { SUPPORTS_INTERSECTION } from '@/util/globals';

// Types
import type { HeadlessDirective, HeadlessDirectiveBinding } from '@/engines/types';

type ObserveHandler = (
  isIntersecting: boolean,
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void

export interface IntersectModifiers {
  once?: boolean;
  quiet?: boolean;
}

export type IntersectValue =
  | ObserveHandler
  | { handler: ObserveHandler, options?: IntersectionObserverInit };

function mounted(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<IntersectValue, IntersectModifiers>
) {
  if (!SUPPORTS_INTERSECTION) return;

  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const { handler, options } = typeof value === 'object'
    ? value
    : { handler: value, options: {} };

  const observer = new IntersectionObserver((
    entries: IntersectionObserverEntry[] = [],
    observer: IntersectionObserver
  ) => {
    const _observe = el._observe?.get(el);
    if (!_observe) return; // Just in case, should never fire

    const isIntersecting = entries.some((entry) => entry.isIntersecting);

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (
      handler && (
        !modifiers.quiet ||
        _observe.init
      ) && (
        !modifiers.once ||
        isIntersecting ||
        _observe.init
      )
    ) {
      handler(isIntersecting, entries, observer);
    }

    if (isIntersecting && modifiers.once) unmounted(el, binding);
    else _observe.init = true;
  }, options);

  el._observe = el._observe ?? new Map();
  el._observe!.set(el, { init: false, observer });

  observer.observe(el);
}

function unmounted(el: HTMLElement, binding: HeadlessDirectiveBinding<IntersectValue, IntersectModifiers>) {
  const observe = el._observe?.get(el);
  if (!observe) return;

  observe.observer.unobserve(el);
  el._observe!.delete(el);
}

export const IntersectDirective: HeadlessDirective<IntersectValue, IntersectModifiers> = {
  mounted,
  unmounted,
};
