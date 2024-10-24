/* eslint-disable complexity */
// Styles
import './VChip.sass';

// Components
import { VChipGroupSymbol } from '@/components/VChipGroup/VChipGroup.base';

// Composables
import { makeBorderProps, useBorder } from '@/composables/border';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeGroupItemProps, useGroupItem } from '@/composables/group';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeRouterProps, useRouterLink } from '@/composables/router';
import { makeSizeProps, useSize } from '@/composables/size';
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
import type { ClassValue } from '@/composables/component';
import type { RippleValue } from '@/directives/ripple';

export type VChipSlots = {
  default: {
    isSelected: boolean | undefined;
    // NOTE(Alpinui): Changed type of selectedClass
    selectedClass: string | undefined;
    select: ((value: boolean) => void) | undefined;
    toggle: (() => void) | undefined;
    value: unknown;
    disabled: boolean;
  };
  label: never;
  prepend: never;
  append: never;
  close: never;
  filter: never;
}

export const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: '$delete',
  },
  closeLabel: {
    type: String,
    default: '$vuetify.close',
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: '$complete',
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: undefined,
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: true,
  },

  onClick: EventProp<[MouseEvent]>(),
  onClickOnce: EventProp<[MouseEvent]>(),

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'span' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'tonal' } as const),
}, 'VChip');

export const _Chip = defineComponent({
  name: 'VChip',

  props: makeVChipProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    'group:selected': (val: { value: boolean }) => true,
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  slots: makeSlots<VChipSlots>({
    default: null,
    label: null,
    prepend: null,
    append: null,
    close: null,
    filter: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { t } = useLocale(vm);
    const { borderClasses } = useBorder(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { colorClasses, colorStyles, variantClasses } = useVariant(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { sizeClasses } = useSize(vm, props);
    const { themeClasses } = provideTheme(vm, props);

    const isActive = useProxiedModel(vm, props, 'modelValue');
    const group = useGroupItem(vm, props, VChipGroupSymbol, false);
    const link = useRouterLink(vm, props, vm.attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (!!group || props.link || link.isClickable.value)
    );
    const closeProps = computed(() => ({
      'aria-label': t(props.closeLabel),
      onClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        isActive.value = false;

        vm.emit('click:close', e);
      },
    }));

    function onClick(e: MouseEvent) {
      vm.emit('click', e);

      if (!isClickable.value) return;

      link.navigate?.(e);
      group?.toggle();
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

    const hasColor = computed(() => !group || group.isSelected.value);

    const rootClasses = computed(() => normalizeClass([
      {
        'v-chip': true,
        'v-chip--disabled': props.disabled,
        'v-chip--label': props.label,
        'v-chip--link': isClickable.value,
        'v-chip--pill': props.pill,
      },
      themeClasses.value,
      borderClasses.value,
      (hasColor.value ? colorClasses.value : {}),
      densityClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      sizeClasses.value,
      variantClasses.value,
      group?.selectedClass.value as ClassValue,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      (hasColor ? colorStyles.value : {}),
      styles.value,
    ]));

    const prependDefaults = computed(() => ({
      VAvatar: {
        image: props.prependAvatar,
        start: true,
      },
      VIcon: {
        icon: props.prependIcon,
        start: true,
      },
    }));

    const appendDefaults = computed(() => ({
      VAvatar: {
        end: true,
        image: props.appendAvatar,
      },
      VIcon: {
        end: true,
        icon: props.appendIcon,
      },
    }));

    const filterDefaults = computed(() => ({
      VIcon: { icon: props.filterIcon },
    }));

    const closeDefaults = computed(() => ({
      VIcon: {
        icon: props.closeIcon,
        size: 'x-small',
      },
    }));

    return {
      expose: {},
      renderInput: {
        closeProps,
        isActive,
        isClickable,
        isLink,
        group,
        link,
        onClick,
        onKeyDown,
        appendDefaults,
        filterDefaults,
        closeDefaults,
        prependDefaults,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
