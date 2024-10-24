// Styles
import './VListItem.sass';

// Composables
import { useList } from './list';
import { makeBorderProps, useBorder } from '@/composables/border';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { useNestedItem } from '@/composables/nested/nested';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeRouterProps, useRouterLink } from '@/composables/router';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps, useVariant } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { EventProp, normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { RippleValue } from '@/directives/ripple';

export type ListItemSlot = {
  isActive: boolean;
  isSelected: boolean;
  isIndeterminate: boolean;
  select: (value: boolean) => void;
}

export type ListItemTitleSlot = {
  title?: string | number;
}

export type ListItemSubtitleSlot = {
  subtitle?: string | number;
}

export type VListItemSlots = {
  prepend: ListItemSlot;
  append: ListItemSlot;
  default: ListItemSlot;
  title: ListItemTitleSlot;
  subtitle: ListItemSubtitleSlot;
}

export const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined,
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
  link: {
    type: Boolean,
    default: undefined,
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,

  onClick: EventProp<[MouseEvent]>(),
  onClickOnce: EventProp<[MouseEvent]>(),

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VListItem');

export const _ListItem = defineComponent({
  name: 'VListItem',

  props: makeVListItemProps(),

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  slots: makeSlots<VListItemSlots>({
    prepend: null,
    append: null,
    default: null,
    title: null,
    subtitle: null,
  }),

  setupHeadless(props, vm) {
    const { computed, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const link = useRouterLink(vm, props, vm.attrs);
    const id = computed(() => props.value === undefined ? link.href.value : props.value);
    const {
      activate,
      isActivated,
      select,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
    } = useNestedItem(vm, id, false);
    const list = useList(vm);
    const isActive = computed(() =>
      props.active !== false &&
      (props.active || link.isActive?.value || (root.activatable.value ? isActivated.value : isSelected.value))
    );
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (props.link || link.isClickable.value || (!!list && (root.selectable.value || root.activatable.value || props.value != null)))
    );

    const roundedProps = computed(() => props.rounded || props.nav);
    const color = computed(() => props.color ?? props.activeColor);
    const variantProps = computed(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant,
    }));

    watch(() => link.isActive?.value, (val) => {
      if (val && parent.value != null) {
        root.open(parent.value, true);
      }

      if (val) {
        openOnSelect(val);
      }
    }, { immediate: true });

    const { themeClasses } = provideTheme(vm, props);
    const { borderClasses } = useBorder(vm, props);
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, variantProps);
    const { densityClasses } = useDensity(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, roundedProps);
    const lineClasses = computed(() => props.lines ? `v-list-item--${props.lines}-line` : undefined);

    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
    } satisfies ListItemSlot));

    function onClick(e: MouseEvent) {
      vm.emit('click', e);

      if (!isClickable.value) return;

      link.navigate?.(e);

      if (isGroupActivator) return;

      if (root.activatable.value) {
        activate(!isActivated.value, e);
      } else if (root.selectable.value) {
        select(!isSelected.value, e);
      } else if (props.value != null) {
        select(!isSelected.value, e);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e as any as MouseEvent);
      }
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const Tag = computed(() => isLink.value ? 'a' : props.tag);
    const hasTitle = computed(() => (vm.hasSlots.title || props.title != null));
    const hasSubtitle = computed(() => (vm.hasSlots.subtitle || props.subtitle != null));
    const hasAppendMedia = computed(() => !!(props.appendAvatar || props.appendIcon));
    const hasAppend = computed(() => !!(hasAppendMedia.value || vm.hasSlots.append));
    const hasPrependMedia = computed(() => !!(props.prependAvatar || props.prependIcon));
    const hasPrepend = computed(() => !!(hasPrependMedia.value || vm.hasSlots.prepend));

    const rootClasses = computed(() => normalizeClass([
      'v-list-item',
      {
        'v-list-item--active': isActive.value,
        'v-list-item--disabled': props.disabled,
        'v-list-item--link': isClickable.value,
        'v-list-item--nav': props.nav,
        'v-list-item--prepend': !!(!hasPrepend.value && list?.hasPrepend.value),
        'v-list-item--slim': props.slim,
        [`${props.activeClass}`]: !!(props.activeClass && isActive.value),
      },
      themeClasses.value,
      borderClasses.value,
      colorClasses.value,
      densityClasses.value,
      elevationClasses.value,
      lineClasses.value,
      roundedClasses.value,
      variantClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      colorStyles.value,
      dimensionStyles.value,
      styles.value,
    ]));

    const prependDefaults = computed(() => ({
      VAvatar: {
        density: props.density,
        image: props.prependAvatar,
      },
      VIcon: {
        density: props.density,
        icon: props.prependIcon,
      },
      VListItemAction: {
        start: true,
      },
    }));

    const appendDefaults = computed(() => ({
      VAvatar: {
        density: props.density,
        image: props.appendAvatar,
      },
      VIcon: {
        density: props.density,
        icon: props.appendIcon,
      },
      VListItemAction: {
        end: true,
      },
    }));

    return {
      expose: {
        activate,
        isActivated,
        isGroupActivator,
        isSelected,
        list,
        select,
      },
      renderInput: {
        link,
        list,
        isActive,
        isClickable,
        isLink,
        hasTitle,
        hasSubtitle,
        hasAppendMedia,
        hasAppend,
        hasPrependMedia,
        hasPrepend,
        prependDefaults,
        appendDefaults,
        rootClasses,
        rootStyles,
        slotProps,
        Tag,
        onClick,
        onKeyDown,
      },
    };
  },
  renderHeadless: () => null,
});
