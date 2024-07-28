// Utilities
import { readonly, ref, watch } from 'alpine-reactivity';
import { IN_BROWSER } from '@/util/globals';
import { templateRef } from '@/util/helpers';

// Types
import type { AlpineInstance, Data, EmitsOptions } from 'alpine-composition';
import type { DeepReadonly, Ref } from 'alpine-reactivity';
import type { TemplateRef } from '@/util/helpers';

interface ResizeState {
  resizeRef: TemplateRef;
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>;
}

export function useResizeObserver(
  vm: AlpineInstance<Data, Data, EmitsOptions>,
  callback?: ResizeObserverCallback,
  box: 'content' | 'border' = 'content',
): ResizeState {
  const resizeRef = templateRef();
  const contentRect = ref<DOMRectReadOnly | undefined>();

  if (IN_BROWSER) {
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      callback?.(entries, observer);

      if (!entries.length) return;

      if (box === 'content') {
        contentRect.value = entries[0].contentRect;
      } else {
        contentRect.value = entries[0].target.getBoundingClientRect();
      }
    });

    vm.$onBeforeUnmount(() => {
      observer.disconnect();
    });

    // TODO: REMOVED "flush: post" option
    watch(() => resizeRef.el, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        contentRect.value = undefined;
      }

      if (newValue) observer.observe(newValue);
    });
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
  };
}
