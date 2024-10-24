// Styles
import './VOverlay.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';

// Composables
import { makeLocationStrategyProps, useLocationStrategies } from './locationStrategies';
import { makeScrollStrategyProps, useScrollStrategies } from './scrollStrategies';
import { makeActivatorProps, useActivator } from './useActivator';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { useHydration } from '@/composables/hydration';
import { makeLazyProps, useLazy } from '@/composables/lazy';
import { useRtl } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useBackButton, useRouter } from '@/composables/router';
import { useScopeId } from '@/composables/scopeId';
import { useStack } from '@/composables/stack';
import { useTeleport } from '@/composables/teleport';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { animate } from '@/util/animation';
import { defineComponent } from '@/util/defineComponent';
import { standardEasing } from '@/util/easing';
import { getScrollParent } from '@/util/getScrollParent';
import { IN_BROWSER } from '@/util/globals';
import { convertToUnit, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType, Ref } from 'vue';
import type { TemplateRef } from '@/util/helpers';

export type VOverlaySlots = {
  default: { isActive: Ref<boolean> };
  activator: { isActive: boolean, props: Record<string, any>, targetRef: TemplateRef };
}

export const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object] as PropType<boolean | string | Element>,
  closeOnBack: {
    type: Boolean,
    default: true,
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  zIndex: {
    type: [Number, String],
    default: 2000,
  },

  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps(),
}, 'VOverlay');

export const _Overlay = defineComponent({
  name: 'VOverlay',

  inheritAttrs: false,

  props: {
    /* eslint-disable-next-line vue/prop-name-casing */
    _disableGlobalStack: Boolean,

    ...makeVOverlayProps(),
  },

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    afterEnter: () => true,
    afterLeave: () => true,
  },

  slots: makeSlots<VOverlaySlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed, onBeforeUnmount, ref, toRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled)) model.value = v;
      },
    });
    const { themeClasses } = provideTheme(vm, props);
    const { rtlClasses, isRtl } = useRtl(vm);
    const { hasContent, onAfterLeave: _onAfterLeave } = useLazy(vm, props, isActive);
    const scrimColor = useBackgroundColor(vm, computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    }));
    const { globalTop, localTop, stackStyles } = useStack(vm, isActive, toRef(props, 'zIndex'), props._disableGlobalStack);
    const {
      activatorEl, activatorRef,
      target, targetEl, targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents,
    } = useActivator(vm, props, { isActive, isTop: localTop });
    const { teleportTarget } = useTeleport(vm, () => {
      const target = props.attach || props.contained;
      if (target) return target;
      const rootNode = activatorEl?.value?.getRootNode();
      if (rootNode instanceof ShadowRoot) return rootNode;
      return false;
    });
    const { dimensionStyles } = useDimension(vm, props);
    const isMounted = useHydration(vm);
    const { scopeId } = useScopeId(vm);

    watch(() => props.disabled, (v) => {
      if (v) isActive.value = false;
    });

    const root = ref<HTMLElement>();
    const scrimEl = ref<HTMLElement>();
    const contentEl = ref<HTMLElement>();
    const { contentStyles: locationContentStyles, updateLocation } = useLocationStrategies(vm, props, {
      isRtl,
      contentEl,
      target,
      isActive,
    });
    useScrollStrategies(vm, props, {
      root,
      contentEl,
      targetEl,
      isActive,
      updateLocation,
    });

    function onClickOutside(e: MouseEvent) {
      vm.emit('click:outside', e);

      if (!props.persistent) isActive.value = false;
      else animateClick();
    }

    function closeConditional(e: Event) {
      return isActive.value && globalTop.value && (
        // If using scrim, only close if clicking on it rather than anything opened on top
        !props.scrim || e.target === scrimEl.value
      );
    }

    IN_BROWSER && watch(isActive, (val) => {
      if (val) {
        window.addEventListener('keydown', onKeydown);
      } else {
        window.removeEventListener('keydown', onKeydown);
      }
    }, { immediate: true });

    onBeforeUnmount(() => {
      if (!IN_BROWSER) return;

      window.removeEventListener('keydown', onKeydown);
    });

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && globalTop.value) {
        if (!props.persistent) {
          isActive.value = false;
          if (contentEl.value?.contains(document.activeElement)) {
            activatorEl.value?.focus();
          }
        } else animateClick();
      }
    }

    // NOTE(Alpinui): Should be noop in AlpineJS
    const router = useRouter(vm);
    useBackButton(vm, router, (next) => {
      if (globalTop.value && isActive.value) {
        next(false);
        if (!props.persistent) isActive.value = false;
        else animateClick();
      } else {
        next();
      }
    });

    // NOTE(Alpinui): Remove `useToggleScope`
    useBackButton(vm, router, (next) => {
      if (globalTop.value && isActive.value && props.closeOnBack) {
        next(false);
        if (!props.persistent) isActive.value = false;
        else animateClick();
      } else {
        next();
      }
    });

    const top = ref<number>();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });

    // Add a quick "bounce" animation to the content
    function animateClick() {
      if (props.noClickAnimation) return;

      contentEl.value && animate(contentEl.value, [
        { transformOrigin: 'center' },
        { transform: 'scale(1.03)' },
        { transformOrigin: 'center' },
      ], {
        duration: 150,
        easing: standardEasing,
      });
    }

    function onAfterEnter() {
      vm.emit('afterEnter');
    }

    function onAfterLeave() {
      _onAfterLeave();
      vm.emit('afterLeave');
    }

    const rootClasses = computed(() => normalizeClass([
      'v-overlay',
      {
        'v-overlay--absolute': props.absolute || props.contained,
        'v-overlay--active': isActive.value,
        'v-overlay--contained': props.contained,
      },
      themeClasses.value,
      rtlClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      stackStyles.value,
      {
        '--v-overlay-opacity': props.opacity,
        top: convertToUnit(top.value),
      },
      styles.value,
    ]));

    const contentClasses = computed(() => normalizeClass([
      'v-overlay__content',
      props.contentClass,
    ]));

    const contentStyles = computed(() => normalizeStyle([
      dimensionStyles.value,
      locationContentStyles.value,
    ]));

    return {
      expose: {
        activatorEl,
        scrimEl,
        target,
        animateClick,
        contentEl,
        globalTop,
        localTop,
        updateLocation,
      },
      renderInput: {
        isActive,
        activatorEl,
        activatorRef,
        activatorEvents,
        contentEl,
        contentClasses,
        contentEvents,
        contentStyles,
        hasContent,
        isMounted,
        root,
        rootClasses,
        rootStyles,
        scopeId,
        scrimEl,
        scrimEvents,
        scrimColor,
        teleportTarget,
        target,
        targetRef,
        onAfterEnter,
        onAfterLeave,
        onClickOutside,
        closeConditional,
      },
    };
  },
  renderHeadless: () => null,
});
