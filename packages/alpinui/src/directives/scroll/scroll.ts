// Types
import type { HeadlessDirective, HeadlessDirectiveBinding } from '@/engines/types';

export type ScrollValue =
  | EventListener
  | {
    handler: EventListener;
    options?: AddEventListenerOptions;
  }
  | EventListenerObject & { options?: AddEventListenerOptions };

export interface ScrollModifiers {
  self?: boolean;
}

function mounted(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<ScrollValue, ScrollModifiers>,
) {
  const { self = false } = binding.modifiers ?? {};
  const value = binding.value!;
  const options = (typeof value === 'object' && value.options) || { passive: true };
  const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler;

  const target = self
    ? el
    : binding.arg
      ? document.querySelector(binding.arg)
      : window;

  if (!target) return;

  target.addEventListener('scroll', handler, options);

  el._onScroll = el._onScroll ?? new Map();
  el._onScroll!.set(el, {
    handler,
    options,
    // Don't reference self
    target: self ? undefined : target,
  });
}

function unmounted(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<ScrollValue, ScrollModifiers>,
) {
  if (!el._onScroll?.has(el)) return;

  const { handler, options, target = el } = el._onScroll.get(el)!;

  target.removeEventListener('scroll', handler, options);
  el._onScroll.delete(el);
}

function updated(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<ScrollValue, ScrollModifiers>,
) {
  if (binding.value === binding.oldValue) return;

  unmounted(el, binding);
  mounted(el, binding);
}

export const ScrollDirective: HeadlessDirective<ScrollValue, ScrollModifiers> = {
  mounted,
  unmounted,
  updated,
};
