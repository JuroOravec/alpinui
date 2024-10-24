// Styles
import './VWindow.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { useGroup } from '@/composables/group';
import { useLocale, useRtl } from '@/composables/locale';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue';
import type { IconValue } from '../VIcon/icons.base';
import type { GroupItemProvide, GroupProvide } from '@/composables/group';
import type { TouchHandlers } from '@/directives/touch';

export type VWindowSlots = {
  default: { group: GroupProvide };
  additional: { group: GroupProvide };
  prev: { props: ControlProps };
  next: { props: ControlProps };
}

type WindowProvide = {
  transition: ComputedRef<undefined | string>;
  transitionCount: Ref<number>;
  transitionHeight: Ref<undefined | string>;
  isReversed: Ref<boolean>;
  rootRef: Ref<HTMLElement | undefined>;
}

type ControlProps = {
  icon: IconValue;
  class: string;
  onClick: () => void;
  'aria-label': string;
}

export const VWindowSymbol: InjectionKey<WindowProvide> = Symbol.for('vuetify:v-window');
export const VWindowGroupSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-window-group');

export const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object] as PropType<IconValue>,
    default: '$next',
  },
  prevIcon: {
    type: [Boolean, String, Function, Object] as PropType<IconValue>,
    default: '$prev',
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v: any) => typeof v === 'boolean' || v === 'hover',
  },
  touch: {
    type: [Object, Boolean] as PropType<boolean | TouchHandlers>,
    default: undefined,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: 'v-window-item--active',
  },
  // TODO(Vuetify): mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String] as PropType<boolean | 'force'>,
    default: 'force' as const,
  },

  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VWindow');

export const _Window = defineComponent({
  name: 'VWindow',

  props: makeVWindowProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VWindowSlots>({
    default: null,
    additional: null,
    prev: null,
    next: null,
  }),

  setupHeadless(props, vm) {
    const { computed, provide, ref, shallowRef, watch } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { isRtl } = useRtl(vm);
    const { t } = useLocale(vm);

    const group = useGroup(vm, props, VWindowGroupSymbol);

    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === 'vertical' ? 'y' : 'x';
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? '-reverse' : '';

      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref<undefined | string>(undefined);

    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });

    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;

      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });

    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef,
    });

    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);

    function prev() {
      canMoveBack.value && group.prev();
    }

    function next() {
      canMoveForward.value && group.next();
    }

    const prevProps = computed(() => ({
      icon: isRtl.value ? props.nextIcon : props.prevIcon,
      class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
      onClick: group.prev,
      'aria-label': t('$vuetify.carousel.prev'),
    }));

    const nextProps = computed(() => ({
      icon: isRtl.value ? props.prevIcon : props.nextIcon,
      class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
      onClick: group.next,
      'aria-label': t('$vuetify.carousel.next'),
    }));

    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;

      const options: TouchHandlers = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: ({ originalEvent }) => {
          originalEvent.stopPropagation();
        },
      };

      return {
        ...options,
        ...(props.touch === true ? {} : props.touch),
      };
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-window',
      { 'v-window--show-arrows-on-hover': props.showArrows === 'hover' },
      themeClasses.value,
      classes.value,
    ]));

    const containerStyles = computed(() => normalizeStyle({
      height: transitionHeight.value,
    }));

    return {
      expose: {
        group,
      },
      renderInput: {
        containerStyles,
        group,
        rootRef,
        rootClasses,
        rootStyles: styles,
        touchOptions,
        prevProps,
        nextProps,
        canMoveBack,
        canMoveForward,
      },
    };
  },
  renderHeadless: () => null,
});
