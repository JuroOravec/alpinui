// Styles
import './VNavigationDrawer.sass';

// Composables
import { useSticky } from './sticky';
import { useTouch } from './touch';
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDelayProps, useDelay } from '@/composables/delay';
import { makeDisplayProps, useDisplay } from '@/composables/display';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout';
import { useRtl } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { useRouter } from '@/composables/router';
import { useScopeId } from '@/composables/scopeId';
import { useSsrBoot } from '@/composables/ssrBoot';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { toPhysical } from '@/util/anchor';
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export type VNavigationDrawerImageSlot = {
  image: string | undefined;
}

export type VNavigationDrawerSlots = {
  default: never;
  prepend: never;
  append: never;
  image: VNavigationDrawerImageSlot;
}

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'] as const;

export const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  permanent: Boolean,
  rail: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  railWidth: {
    type: [Number, String],
    default: 56,
  },
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256,
  },
  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'start',
    validator: (value: any) => locations.includes(value),
  },
  sticky: Boolean,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({ mobile: null }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'nav' }),
  ...makeThemeProps(),
}, 'VNavigationDrawer');

export const _NavigationDrawer = defineComponent({
  name: 'VNavigationDrawer',

  props: makeVNavigationDrawerProps(),

  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:rail': (val: boolean) => true,
  },

  slots: makeSlots<VNavigationDrawerSlots>({
    default: null,
    prepend: null,
    append: null,
    image: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref, shallowRef, toRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { isRtl } = useRtl(vm);
    const { themeClasses } = provideTheme(vm, props);
    const { borderClasses } = useBorder(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { elevationClasses } = useElevation(vm, props);
    const { displayClasses, mobile } = useDisplay(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const router = useRouter(vm);
    const isActive = useProxiedModel(vm, props, 'modelValue', null, (v) => !!v);
    const { ssrBootStyles } = useSsrBoot(vm);
    const { scopeId } = useScopeId(vm);

    const rootEl = ref<HTMLElement>();
    const isHovering = shallowRef(false);

    const { runOpenDelay, runCloseDelay } = useDelay(props, (value) => {
      isHovering.value = value;
    });

    const width = computed(() => {
      return (props.rail && props.expandOnHover && isHovering.value)
        ? Number(props.width)
        : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value) as 'left' | 'right' | 'bottom';
    });
    const isPersistent = computed(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() =>
      props.sticky &&
      !isTemporary.value &&
      location.value !== 'bottom'
    );

    // NOTE(Alpinui): Refactored from useToggleScope
    watch(
      [isHovering, () => props.expandOnHover && props.rail != null],
      ([val, cond]) => {
        if (!cond) return;
        vm.emit('update:rail', !val);
      }
    );

    // NOTE(Alpinui): Refactored from useToggleScope
    watch(
      [isTemporary, () => !props.disableResizeWatcher],
      ([val, cond]) => {
        if (!cond || props.permanent) return;
        nextTick(() => isActive.value = !val);
      }
    );

    // NOTE(Alpinui): Refactored from useToggleScope
    watch(
      [router!.currentRoute, () => !props.disableRouteWatcher && !!router],
      ([_, cond]) => {
        if (!cond || !isTemporary.value) return;

        isActive.value = false;
      }
    );

    watch(() => props.permanent, (val) => {
      if (val) isActive.value = true;
    });

    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }

    const { isDragging, dragProgress } = useTouch(vm, {
      el: rootEl,
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, 'touchless'),
      position: location,
    });

    const layoutSize = computed(() => {
      const size = isTemporary.value
        ? 0
        : props.rail && props.expandOnHover
          ? Number(props.railWidth)
          : width.value;

      return isDragging.value ? size * dragProgress.value : size;
    });
    const elementSize = computed(() => ['top', 'bottom'].includes(props.location) ? 0 : width.value);
    const { layoutItemStyles, layoutItemScrimStyles, layoutIsReady } = useLayoutItem(vm, {
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || (isSticky.value && typeof isStuck.value !== 'string')
      ),
    });

    const { isStuck, stickyStyles } = useSticky(vm, { rootEl, isSticky, layoutItemStyles });

    const scrimColor = useBackgroundColor(vm, computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    }));
    const scrimStyles = computed(() => normalizeStyle([
      isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none',
      } : {},
      layoutItemScrimStyles.value,
      scrimColor.backgroundColorStyles.value,
    ]));

    provideDefaults(vm, {
      VList: {
        bgColor: 'transparent',
      },
    });

    const onScrimClick = () => {
      if (isPersistent.value) return;
      isActive.value = false;
    };

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-navigation-drawer',
      `v-navigation-drawer--${location.value}`,
      {
        'v-navigation-drawer--expand-on-hover': props.expandOnHover,
        'v-navigation-drawer--floating': props.floating,
        'v-navigation-drawer--is-hovering': isHovering.value,
        'v-navigation-drawer--rail': !!props.rail,
        'v-navigation-drawer--temporary': isTemporary.value,
        'v-navigation-drawer--persistent': isPersistent.value,
        'v-navigation-drawer--active': isActive.value,
        'v-navigation-drawer--sticky': isSticky.value,
      },
      themeClasses.value,
      backgroundColorClasses.value,
      borderClasses.value,
      displayClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      layoutItemStyles.value,
      ssrBootStyles.value,
      stickyStyles.value,
      styles.value,
      ['top', 'bottom'].includes(location.value) ? { height: 'auto' } : {},
    ]));

    const imageDefaults = computed(() => ({
      VImg: {
        alt: '',
        cover: true,
        height: 'inherit',
        src: props.image,
      },
    }));

    const scrimClasses = computed(() => normalizeClass([
      'v-navigation-drawer__scrim',
      scrimColor.backgroundColorClasses.value,
    ]));

    const showScrim = computed(() => isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim);

    return {
      expose: layoutIsReady.then(() => ({ isStuck })),
      renderInput: {
        imageDefaults,
        rootClasses,
        rootStyles,
        rootEl,
        scrimClasses,
        scrimStyles,
        showScrim,
        onScrimClick,
        scopeId,
        runOpenDelay,
        runCloseDelay,
      },
    };
  },
  renderHeadless: () => null,
});
