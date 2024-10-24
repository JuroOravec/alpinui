// Styles
import './VAppBar.sass';

// Components
import { _Toolbar, makeVToolbarProps } from '@/components/VToolbar/VToolbar.base';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeScrollProps, useScroll } from '@/composables/scroll';
import { useSsrBoot } from '@/composables/ssrBoot';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VToolbar, VToolbarSlots } from '@/components/VToolbar/VToolbar';

export interface VAppBarSlots extends VToolbarSlots {
  /** Empty */
}

export const makeVAppBarProps = propsFactory({
  scrollBehavior: String as PropType<'hide' | 'inverted' | 'collapse' | 'elevate' | 'fade-image' | (string & {})>,
  modelValue: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
    validator: (value: any) => ['top', 'bottom'].includes(value),
  },

  ...makeComponentProps(),
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),

  height: {
    type: [Number, String],
    default: 64,
  },
}, 'VAppBar');

export const _AppBar = defineComponent({
  name: 'VAppBar',

  props: makeVAppBarProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VAppBarSlots>({
    default: null,
    image: null,
    prepend: null,
    append: null,
    title: null,
    extension: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, shallowRef, toRef, watchEffect } = vm.reactivity;

    const vToolbarRef = ref<VToolbar>();
    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');
    const scrollBehavior = computed(() => {
      const behavior = new Set(props.scrollBehavior?.split(' ') ?? []);
      return {
        hide: behavior.has('hide'),
        fullyHide: behavior.has('fully-hide'),
        inverted: behavior.has('inverted'),
        collapse: behavior.has('collapse'),
        elevate: behavior.has('elevate'),
        fadeImage: behavior.has('fade-image'),
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return (
        behavior.hide ||
        behavior.fullyHide ||
        behavior.inverted ||
        behavior.collapse ||
        behavior.elevate ||
        behavior.fadeImage ||
        // behavior.shrink ||
        !isActive.value
      );
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio,
    } = useScroll(vm, props, { canScroll });

    const canHide = computed(() => (
      scrollBehavior.value.hide ||
      scrollBehavior.value.fullyHide
    ));
    const isCollapsed = computed(() => props.collapse || (
      scrollBehavior.value.collapse &&
      (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
    ));
    const isFlat = computed(() => props.flat || (
      scrollBehavior.value.fullyHide &&
      !isActive.value
    ) || (
      scrollBehavior.value.elevate &&
      (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
    ));
    const opacity = computed(() => (
      scrollBehavior.value.fadeImage
        ? (scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value)
        : undefined
    ));
    const height = computed(() => {
      const height = Number(vToolbarRef.value?.contentHeight ?? props.height);
      const extensionHeight = Number(vToolbarRef.value?.extensionHeight ?? 0);

      if (!canHide.value) return (height + extensionHeight);

      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide
        ? (height + extensionHeight)
        : height;
    });

    // NOTE(Alpinui): Refactored from useToggleScope
    watchEffect(() => {
      // Touch
      /* eslint-disable no-unused-expressions */
      canHide.value;
      currentScroll.value;
      isActive.value;
      isScrollingUp.value;
      scrollBehavior.value;
      scrollThreshold.value;
      /* eslint-enable no-unused-expressions */

      if (!props.scrollBehavior) return;

      if (canHide.value) {
        if (scrollBehavior.value.inverted) {
          isActive.value = currentScroll.value > scrollThreshold.value;
        } else {
          isActive.value = isScrollingUp.value || (currentScroll.value < scrollThreshold.value);
        }
      } else {
        isActive.value = true;
      }
    });

    const { ssrBootStyles } = useSsrBoot(vm);
    const { layoutItemStyles, layoutIsReady } = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, 'location'),
      layoutSize: height,
      elementSize: shallowRef(undefined),
      active: isActive,
      absolute: toRef(props, 'absolute'),
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const toolbarClasses = computed(() => normalizeClass([
      {
        'v-app-bar': true,
        'v-app-bar--bottom': props.location === 'bottom',
      },
      classes.value,
    ]));
    const toolbarStyles = computed(() => normalizeStyle([
      layoutItemStyles.value,
      {
        '--v-toolbar-image-opacity': opacity.value,
        height: undefined,
      },
      ssrBootStyles.value,
      styles.value,
    ]));

    const toolbarProps = computed(() => _Toolbar.filterProps(props));

    return {
      expose: layoutIsReady,
      renderInput: {
        isCollapsed,
        isFlat,
        toolbarClasses,
        toolbarStyles,
        vToolbarRef,
        toolbarProps,
      },
    };
  },
  renderHeadless: () => null,
});
