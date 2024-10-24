// Styles
import './VDialog.sass';

// Components
import { _Overlay, makeVOverlayProps } from '@/components/VOverlay/VOverlay.base';

// Composables
import { useComponent } from '@/composables/component';
import { forwardRefs } from '@/composables/forwardRefs';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useScopeId } from '@/composables/scopeId';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { IN_BROWSER } from '@/util/globals';
import { focusableChildren, mergeProps, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component } from 'vue';
import type { VOverlay, VOverlaySlots } from '@/components/VOverlay/VOverlay';

export type VDialogSlots = VOverlaySlots;

export const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true,
  },
  scrollable: Boolean,

  ...makeVOverlayProps({
    origin: 'center center' as const,
    scrollStrategy: 'block' as const,
    // NOTE(Alpinui): The default component is set in `VDialog.tsx`
    transition: { component: null as any as Component },
    zIndex: 2400,
  }),
}, 'VDialog');

export const _Dialog = defineComponent({
  name: 'VDialog',

  props: makeVDialogProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    afterLeave: () => true,
  },

  slots: makeSlots<VDialogSlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');
    const { scopeId } = useScopeId(vm);

    const overlay = ref<VOverlay>();
    function onFocusin(e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null;
      const after = e.target as HTMLElement | null;

      if (
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost dialog
        overlay.value?.globalTop &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)
      ) {
        const focusable = focusableChildren(overlay.value.contentEl);

        if (!focusable.length) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (before === firstElement) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
      }
    }

    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, (val) => {
        val
          ? document.addEventListener('focusin', onFocusin)
          : document.removeEventListener('focusin', onFocusin);
      }, { immediate: true });
    }

    function onAfterEnter() {
      if (overlay.value?.contentEl && !overlay.value.contentEl.contains(document.activeElement)) {
        overlay.value.contentEl.focus({ preventScroll: true });
      }
    }

    function onAfterLeave() {
      vm.emit('afterLeave');
    }

    watch(isActive, async(val) => {
      if (!val) {
        await nextTick();
        overlay.value!.activatorEl?.focus({ preventScroll: true });
      }
    });

    const overlayProps = computed(() => _Overlay.filterProps(props));
    const activatorProps = computed(() => mergeProps({
      'aria-haspopup': 'dialog',
      'aria-expanded': String(isActive.value),
    }, props.activatorProps));
    const contentProps = computed(() => mergeProps({
      tabindex: -1,
    }, props.contentProps));

    const rootClasses = computed(() => normalizeClass([
      'v-dialog',
      {
        'v-dialog--fullscreen': props.fullscreen,
        'v-dialog--scrollable': props.scrollable,
      },
      classes.value,
    ]));

    return {
      expose: forwardRefs({}, overlay),
      renderInput: {
        activatorProps,
        contentProps,
        overlayProps,
        isActive,
        overlay,
        onAfterEnter,
        onAfterLeave,
        scopeId,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
