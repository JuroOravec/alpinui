// Styles
import './VPagination.sass';

// Composables
import { makeBorderProps } from '@/composables/border';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps } from '@/composables/density';
import { useDisplay } from '@/composables/display';
import { makeElevationProps } from '@/composables/elevation';
import { useLocale, useRtl } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useRefs } from '@/composables/refs';
import { useResizeObserver } from '@/composables/resizeObserver';
import { makeRoundedProps } from '@/composables/rounded';
import { makeSizeProps } from '@/composables/size';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { createRange, keyValues, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComponentPublicInstance } from 'vue';
import { IconValue } from '../VIcon/icons.base';

type ItemSlot = {
  isActive: boolean;
  key: string | number;
  page: string;
  props: Record<string, any>;
}

type ControlSlot = {
  icon: IconValue;
  onClick: (e: Event) => void;
  disabled: boolean;
  'aria-label': string;
  'aria-disabled': boolean;
}

export type VPaginationSlots = {
  item: ItemSlot;
  first: ControlSlot;
  prev: ControlSlot;
  next: ControlSlot;
  last: ControlSlot;
}

export const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1,
  },
  modelValue: {
    type: Number,
    default: (props: any) => props.start as number,
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val: number) => val % 1 === 0,
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: '$first',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  lastIcon: {
    type: IconValue,
    default: '$last',
  },
  ariaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.root',
  },
  pageAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.page',
  },
  currentPageAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.currentPage',
  },
  firstAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.first',
  },
  previousAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.previous',
  },
  nextAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.next',
  },
  lastAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.last',
  },
  ellipsis: {
    type: String,
    default: '...',
  },
  showFirstLastPage: Boolean,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'nav' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VPagination');

export const _Pagination = defineComponent({
  name: 'VPagination',

  props: makeVPaginationProps(),

  emits: {
    'update:modelValue': (value: number) => true,
    first: (value: number) => true,
    prev: (value: number) => true,
    next: (value: number) => true,
    last: (value: number) => true,
  },

  slots: makeSlots<VPaginationSlots>({
    item: null,
    first: null,
    prev: null,
    next: null,
    last: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, shallowRef, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const page = useProxiedModel(vm, props, 'modelValue');
    const { t, n } = useLocale(vm);
    const { isRtl } = useRtl(vm);
    const { themeClasses } = provideTheme(vm, props);
    const { width } = useDisplay(vm);
    const maxButtons = shallowRef(-1);

    provideDefaults(vm, undefined, { scoped: true });

    const { resizeRef } = useResizeObserver(vm, (entries: ResizeObserverEntry[]) => {
      if (!entries.length) return;

      const { target, contentRect } = entries[0];

      const firstItem = target.querySelector('.v-pagination__list > *') as HTMLElement;

      if (!firstItem) return;

      const totalWidth = contentRect.width;
      const itemWidth =
        firstItem.offsetWidth +
        parseFloat(getComputedStyle(firstItem).marginRight) * 2;

      maxButtons.value = getMax(totalWidth, itemWidth);
    });

    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));

    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });

    function getMax(totalWidth: number, itemWidth: number) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
      ));
    }

    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];

      if (totalVisible.value <= 0) return [];
      else if (totalVisible.value === 1) return [page.value];

      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }

      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;

      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 3);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });

    // TODO(Vuetify): 'first' | 'prev' | 'next' | 'last' does not work here?
    function setValue(e: Event, value: number, event?: any) {
      e.preventDefault();
      page.value = value;
      event && vm.emit(event, value);
    }

    const { refs, updateRef } = useRefs<ComponentPublicInstance>(vm);

    provideDefaults(vm, {
      VPaginationBtn: {
        color: toRef(props, 'color'),
        border: toRef(props, 'border'),
        density: toRef(props, 'density'),
        size: toRef(props, 'size'),
        variant: toRef(props, 'variant'),
        rounded: toRef(props, 'rounded'),
        elevation: toRef(props, 'elevation'),
      },
    });

    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref = (e: any) => updateRef(e, index);

        if (typeof item === 'string') {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref,
              ellipsis: true,
              icon: true,
              disabled: true,
            },
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || +props.length < 2,
              color: isActive ? props.activeColor : props.color,
              'aria-current': isActive,
              'aria-label': t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e: Event) => setValue(e, item),
            },
          };
        }
      });
    });

    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;

      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e: Event) => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          'aria-label': t(props.firstAriaLabel),
          'aria-disabled': prevDisabled,
        } : undefined,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e: Event) => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          'aria-label': t(props.previousAriaLabel),
          'aria-disabled': prevDisabled,
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e: Event) => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          'aria-label': t(props.nextAriaLabel),
          'aria-disabled': nextDisabled,
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e: Event) => setValue(e, start.value + length.value - 1, 'last'),
          disabled: nextDisabled,
          'aria-label': t(props.lastAriaLabel),
          'aria-disabled': nextDisabled,
        } : undefined,
      };
    });

    function updateFocus() {
      const currentIndex = page.value - start.value;
      refs.value[currentIndex]?.$el.focus();
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === keyValues.left && !props.disabled && page.value > +props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-pagination',
      themeClasses.value,
      classes.value,
    ]));

    const rootAriaLabel = computed(() => t(props.ariaLabel));

    return {
      expose: {},
      renderInput: {
        controls,
        items,
        resizeRef,
        rootAriaLabel,
        rootClasses,
        rootStyles: styles,
        onKeydown,
      },
    };
  },
  renderHeadless: () => null,
});
