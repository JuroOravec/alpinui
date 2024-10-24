// Utilities
import { IN_BROWSER } from '@/util/globals';
import { templateRef } from '@/util/helpers';

// Types
import type { DeepReadonly, Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';
import type { TemplateRef } from '@/util/helpers';

interface ResizeState {
  resizeRef: TemplateRef;
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>;
}

export function useResizeObserver(
  vm: HeadlessInstance,
  callback?: ResizeObserverCallback,
  box: 'content' | 'border' = 'content',
): ResizeState {
  const { onBeforeUnmount, readonly, ref, watch } = vm.reactivity;

  const resizeRef = templateRef(vm);
  const contentRect = ref<DOMRectReadOnly>();

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

    onBeforeUnmount(() => {
      observer.disconnect();
    });

    watch(() => resizeRef.el, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        contentRect.value = undefined;
      }

      if (newValue) observer.observe(newValue);
    }, {
      flush: 'post',
    });
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
  };
}
