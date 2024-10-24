// Styles
import './VRating.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps } from '@/composables/density';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeSizeProps } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { clamp, createRange, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Prop } from 'vue';
import { IconValue } from '../VIcon/icons.base';

type VRatingItemSlot = {
  value: number;
  index: number;
  isFilled: boolean;
  isHovered: boolean;
  icon: IconValue;
  color?: string;
  props: Record<string, unknown>;
  rating: number;
}

type VRatingItemLabelSlot = {
  value: number;
  index: number;
  label?: string;
}

export type VRatingSlots = {
  item: VRatingItemSlot;
  'item-label': VRatingItemLabelSlot;
}

export const makeVRatingProps = propsFactory({
  name: String,
  itemAriaLabel: {
    type: String,
    default: '$vuetify.rating.ariaLabel.item',
  },
  activeColor: String,
  color: String,
  clearable: Boolean,
  disabled: Boolean,
  emptyIcon: {
    type: IconValue,
    default: '$ratingEmpty',
  },
  fullIcon: {
    type: IconValue,
    default: '$ratingFull',
  },
  halfIncrements: Boolean,
  hover: Boolean,
  length: {
    type: [Number, String],
    default: 5,
  },
  readonly: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  itemLabels: Array as Prop<string[]>,
  itemLabelPosition: {
    type: String,
    default: 'top',
    validator: (v: any) => ['top', 'bottom'].includes(v),
  },
  ripple: Boolean,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VRating');

export const _Rating = defineComponent({
  name: 'VRating',

  props: makeVRatingProps(),

  emits: {
    'update:modelValue': (value: number | string) => true,
  },

  slots: makeSlots<VRatingSlots>({
    item: null,
    'item-label': null,
  }),

  setupHeadless(props, vm) {
    const { computed, shallowRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { t } = useLocale(vm);
    const { themeClasses } = provideTheme(vm, props);
    const rating = useProxiedModel(vm, props, 'modelValue');
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, +props.length));

    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = shallowRef(-1);

    const itemState = computed(() => increments.value.map((value) => {
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = props.activeColor ?? props.color;
      const color = (isFilled || isHovered) ? activeColor : props.color;

      return { isFilled, isHovered, icon, color };
    }));

    const eventState = computed(() => [0, ...increments.value].map((value) => {
      function onMouseenter() {
        hoverIndex.value = value;
      }

      function onMouseleave() {
        hoverIndex.value = -1;
      }

      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onClick,
      };
    }));

    const name = computed(() => props.name ?? `v-rating-${getUid(vm)}`);

    const rootClasses = computed(() => normalizeClass([
      'v-rating',
      {
        'v-rating--hover': props.hover,
        'v-rating--readonly': props.readonly,
      },
      themeClasses.value,
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        eventState,
        itemState,
        name,
        normalizedValue,
        range,
        rootClasses,
        rootStyles: styles,
        t,
      },
    };
  },
  renderHeadless: () => null,
});
