// Styles
import './VMenu.sass';

// Components
import { _Overlay, makeVOverlayProps } from '@/components/VOverlay/VOverlay.base';

// Composables
import { useComponent } from '@/composables/component';
import { forwardRefs } from '@/composables/forwardRefs';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useScopeId } from '@/composables/scopeId';

// Utilities
import { VMenuSymbol } from './shared';
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { focusableChildren, focusChild, getNextElement, isClickInsideElement, mergeProps, normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component } from 'vue';
import type { VOverlay, VOverlaySlots } from '@/components/VOverlay/VOverlay';

export const makeVMenuProps = propsFactory({
  // TODO(Vuetify)
  // disableKeys: Boolean,
  id: String,

  ...omit(makeVOverlayProps({
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: 'connected' as const,
    openDelay: 300,
    scrim: false,
    scrollStrategy: 'reposition' as const,
    // NOTE(Alpinui): We set the default component in the Vue file
    transition: { component: null as any as Component },
  }), ['absolute']),
}, 'VMenu');

export type VMenuSlots = VOverlaySlots;

export const _Menu = defineComponent({
  name: 'VMenu',

  props: makeVMenuProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VMenuSlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject, nextTick, provide, ref, shallowRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');
    const { scopeId } = useScopeId(vm);

    const uid = getUid(vm);
    const id = computed(() => props.id || `v-menu-${uid}`);

    const overlay = ref<VOverlay>();

    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(0);
    provide(VMenuSymbol, {
      register() {
        ++openChildren.value;
      },
      unregister() {
        --openChildren.value;
      },
      closeParents(e) {
        setTimeout(() => {
          if (!openChildren.value &&
            !props.persistent &&
            (e == null || (e && !isClickInsideElement(e, overlay.value!.contentEl!)))
          ) {
            isActive.value = false;
            parent?.closeParents();
          }
        }, 40);
      },
    });

    async function onFocusIn(e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null;
      const after = e.target as HTMLElement | null;

      await nextTick();

      if (
        isActive.value &&
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost menu
        overlay.value?.globalTop &&
        // It isn't the document or the menu body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the menu body
        !overlay.value.contentEl.contains(after)
      ) {
        const focusable = focusableChildren(overlay.value.contentEl);
        focusable[0]?.focus();
      }
    }

    watch(isActive, (val) => {
      if (val) {
        parent?.register();
        document.addEventListener('focusin', onFocusIn, { once: true });
      } else {
        parent?.unregister();
        document.removeEventListener('focusin', onFocusIn);
      }
    });

    function onClickOutside(e: MouseEvent) {
      parent?.closeParents(e);
    }

    function onKeydown(e: KeyboardEvent) {
      if (props.disabled) return;

      if (e.key === 'Tab' || (e.key === 'Enter' && !props.closeOnContentClick)) {
        if (
          e.key === 'Enter' &&
          ((e.target instanceof HTMLTextAreaElement) ||
          (e.target instanceof HTMLInputElement && !!e.target.closest('form')))
        ) return;
        if (e.key === 'Enter') e.preventDefault();

        const nextElement = getNextElement(
          focusableChildren(overlay.value?.contentEl as Element, false),
          e.shiftKey ? 'prev' : 'next',
          (el: HTMLElement) => el.tabIndex >= 0
        );
        if (!nextElement) {
          isActive.value = false;
          overlay.value?.activatorEl?.focus();
        }
      } else if (['Enter', ' '].includes(e.key) && props.closeOnContentClick) {
        isActive.value = false;
        parent?.closeParents();
      }
    }

    function onActivatorKeydown(e: KeyboardEvent) {
      if (props.disabled) return;

      const el = overlay.value?.contentEl;
      if (el && isActive.value) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          focusChild(el, 'next');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          focusChild(el, 'prev');
        }
      } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }

    const activatorProps = computed(() =>
      mergeProps({
        'aria-haspopup': 'menu',
        'aria-expanded': String(isActive.value),
        'aria-owns': id.value,
        onKeydown: onActivatorKeydown,
      }, props.activatorProps)
    );

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-menu',
      classes.value,
    ]));

    const overlayProps = computed(() => _Overlay.filterProps(props));

    return {
      expose: forwardRefs({ id, ΨopenChildren: openChildren }, overlay),
      renderInput: {
        isActive,
        id,
        activatorProps,
        overlay,
        overlayProps,
        scopeId,
        rootClasses,
        rootStyles: styles,
        onClickOutside,
        onKeydown,
      },
    };
  },
  renderHeadless: () => null,
});
