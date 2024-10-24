// Types
import type { MutationOptions } from '@/composables/mutationObserver';
import type { HeadlessDirective, HeadlessDirectiveBinding } from '@/engines/types';

export type MutateValue =
  | MutationCallback
  | { handler: MutationCallback, options?: MutationObserverInit };

function mounted(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<MutateValue, MutationOptions>,
) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const { once, immediate, ...modifierKeys } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;

  const { handler, options } = typeof value === 'object'
    ? value
    : {
      handler: value,
      options: {
        attributes: modifierKeys?.attr ?? defaultValue,
        characterData: modifierKeys?.char ?? defaultValue,
        childList: modifierKeys?.child ?? defaultValue,
        subtree: modifierKeys?.sub ?? defaultValue,
      },
    };

  const observer = new MutationObserver((
    mutations: MutationRecord[] = [],
    observer: MutationObserver
  ) => {
    handler?.(mutations, observer);

    if (once) unmounted(el, binding);
  });

  if (immediate) handler?.([], observer);

  el._mutate = el._mutate ?? new Map();
  el._mutate!.set(el, { observer });

  observer.observe(el, options);
}

function unmounted(
  el: HTMLElement,
  binding: HeadlessDirectiveBinding<MutateValue, MutationOptions>,
) {
  if (!el._mutate?.has(el)) return;

  el._mutate.get(el)!.observer.disconnect();
  el._mutate.delete(el);
}

export const MutateDirective: HeadlessDirective<MutateValue, MutationOptions> = {
  mounted,
  unmounted,
};
