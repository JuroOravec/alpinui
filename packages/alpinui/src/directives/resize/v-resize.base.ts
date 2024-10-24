// Types
import type { HeadlessDirective, HeadlessDirectiveBinding } from '@/engines/types';

export interface ResizeModifiers {
  active?: boolean;
  quiet?: boolean;
}

export type ResizeValue = () => void;

function mounted(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<ResizeValue, ResizeModifiers>,
) {
  const handler = binding.value!;
  const options: AddEventListenerOptions = {
    passive: !binding.modifiers?.active,
  };

  window.addEventListener('resize', handler, options);

  el._onResize = el._onResize ?? new Map();
  el._onResize!.set(el, {
    handler,
    options,
  });

  if (!binding.modifiers?.quiet) {
    handler();
  }
}

function unmounted(el: HTMLElement, binding: HeadlessDirectiveBinding<ResizeValue, ResizeModifiers>) {
  if (!el._onResize?.has(el)) return;

  const { handler, options } = el._onResize.get(el)!;

  window.removeEventListener('resize', handler, options);

  el._onResize.delete(el);
}

export const ResizeDirective: HeadlessDirective<ResizeValue, ResizeModifiers> = {
  mounted,
  unmounted,
};
