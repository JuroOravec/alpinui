// Styles
import './VSnackbar.sass';

// Components
import { _Overlay, makeVOverlayProps } from '@/components/VOverlay/VOverlay.base';

// Composables
import { useComponent } from '@/composables/component';
import { forwardRefs } from '@/composables/forwardRefs';
import { useLayout, VuetifyLayoutKey } from '@/composables/layout';
import { makeLocationProps } from '@/composables/location';
import { makePositionProps, usePosition } from '@/composables/position';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { useScopeId } from '@/composables/scopeId';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps, useVariant } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { mergeProps, normalizeClass, normalizeStyle, omit, refElement } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComponentPublicInstance, Ref } from 'vue';
import type { VOverlay } from '@/components/VOverlay';
import type { VProgressLinear } from '@/components/VProgressLinear';
import type { HeadlessInstance } from '@/engines/types';

export type VSnackbarSlots = {
  activator: { isActive: boolean, props: Record<string, any> };
  default: never;
  actions: { isActive: Ref<boolean> };
  text: never;
}

function useCountdown(vm: HeadlessInstance, milliseconds: number) {
  const { nextTick, shallowRef, onBeforeUnmount } = vm.reactivity;

  const time = shallowRef(milliseconds);
  let timer = -1;

  function clear() {
    clearInterval(timer);
  }

  function reset() {
    clear();

    nextTick(() => time.value = milliseconds);
  }

  function start(el?: HTMLElement) {
    const style = el ? getComputedStyle(el) : { transitionDuration: 0.2 };
    const interval = parseFloat(style.transitionDuration) * 1000 || 200;

    clear();

    if (time.value <= 0) return;

    const startTime = performance.now();
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startTime + interval;
      time.value = Math.max(milliseconds - elapsed, 0);

      if (time.value <= 0) clear();
    }, interval);
  }

  // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
  onBeforeUnmount(clear);

  return { clear, time, start, reset };
}

export const makeVSnackbarProps = propsFactory({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5000,
  },
  vertical: Boolean,

  ...makeLocationProps({ location: 'bottom' } as const),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeVariantProps(),
  ...makeThemeProps(),
  ...omit(makeVOverlayProps({
    transition: 'v-snackbar-transition',
  }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy']),
}, 'VSnackbar');

export const _Snackbar = defineComponent({
  name: 'VSnackbar',

  props: makeVSnackbarProps(),

  emits: {
    'update:modelValue': (v: boolean) => true,
  },

  slots: makeSlots<VSnackbarSlots>({
    activator: null,
    default: null,
    actions: null,
    text: null,
  }),

  setupHeadless(props, vm) {
    const { computed, inject, onMounted, ref, shallowRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');
    const { positionClasses } = usePosition(vm, props);
    const { scopeId } = useScopeId(vm);
    const { themeClasses } = provideTheme(vm, props);
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const countdown = useCountdown(vm, Number(props.timeout));

    const overlay = ref<VOverlay>();
    const timerRef = ref<VProgressLinear>();
    const isHovering = shallowRef(false);
    const startY = shallowRef(0);
    const mainStyles = ref();
    const hasLayout = inject(VuetifyLayoutKey, undefined);

    // NOTE(Alpinui): Replaced `useToggleScope` with `watch`
    const layout = useLayout(vm);
    watch(
      [
        () => !!hasLayout,
        mainStyles,
        layout.mainStyles,
      ],
      (cond) => {
        if (!cond) return;

        mainStyles.value = layout.mainStyles.value;
      }
    );

    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);

    onMounted(() => {
      if (isActive.value) startTimeout();
    });

    let activeTimeout = -1;
    function startTimeout() {
      countdown.reset();
      window.clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);

      if (!isActive.value || timeout === -1) return;

      const element = refElement(timerRef.value as ComponentPublicInstance);

      countdown.start(element);

      activeTimeout = window.setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }

    function clearTimeout() {
      countdown.reset();
      window.clearTimeout(activeTimeout);
    }

    function onPointerenter() {
      isHovering.value = true;
      clearTimeout();
    }

    function onPointerleave() {
      isHovering.value = false;
      startTimeout();
    }

    function onTouchstart(event: TouchEvent) {
      startY.value = event.touches[0].clientY;
    }

    function onTouchend(event: TouchEvent) {
      if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
        isActive.value = false;
      }
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const locationClasses = computed(() => {
      return props.location.split(' ').reduce((acc, loc) => {
        acc[`v-snackbar--${loc}`] = true;

        return acc;
      }, {} as Record<string, any>);
    });

    const overlayProps = computed(() => _Overlay.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-snackbar',
      {
        'v-snackbar--active': isActive.value,
        'v-snackbar--multi-line': props.multiLine && !props.vertical,
        'v-snackbar--timer': !!props.timer,
        'v-snackbar--vertical': props.vertical,
      },
      locationClasses.value,
      positionClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      mainStyles.value,
      styles.value,
    ]));

    const actionsDefaults = computed(() => ({
      VBtn: {
        variant: 'text',
        ripple: false,
        slim: true,
      },
    }));

    const contentProps = computed(() => mergeProps({
      class: normalizeClass([
        'v-snackbar__wrapper',
        themeClasses.value,
        colorClasses.value,
        roundedClasses.value,
        variantClasses.value,
      ]),
      style: normalizeStyle([
        colorStyles.value,
      ]),
      onPointerenter,
      onPointerleave,
    }, overlayProps.value.contentProps));

    return {
      expose: forwardRefs({}, overlay),
      renderInput: {
        countdown,
        isActive,
        isHovering,
        scopeId,
        overlay,
        timerRef,
        actionsDefaults,
        contentProps,
        overlayProps,
        rootClasses,
        rootStyles,
        onTouchstart,
        onTouchend,
      },
    };
  },
  renderHeadless: () => null,
});
