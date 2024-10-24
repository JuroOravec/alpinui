// Styles
import './VStepper.sass';

// Components
import { VStepperSymbol } from './shared';
import { makeVStepperActionsProps } from './VStepperActions.base';
import { _Sheet, makeVSheetProps } from '@/components/VSheet/VSheet.base';

// Composables
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDisplayProps, useDisplay } from '@/composables/display';
import { makeGroupProps, useGroup } from '@/composables/group';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getPropertyFromItem, normalizeClass, only } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VStepperActionsSlots } from './VStepperActions.base';
import type { StepperItem, StepperItemSlot } from './VStepperItem.base';

export type VStepperSlot = {
  prev: () => void;
  next: () => void;
}

export type VStepperSlots = {
  actions: VStepperSlot;
  default: VStepperSlot;
  header: StepperItem;
  'header-item': StepperItemSlot;
  icon: StepperItemSlot;
  title: StepperItemSlot;
  subtitle: StepperItemSlot;
  item: StepperItem;
  prev: VStepperActionsSlots['prev'];
  next: VStepperActionsSlots['next'];
} & {
  [key: `header-item.${string}`]: StepperItemSlot;
  [key: `item.${string}`]: StepperItem;
}

export const makeStepperProps = propsFactory({
  altLabels: Boolean,
  bgColor: String,
  completeIcon: String,
  editIcon: String,
  editable: Boolean,
  errorIcon: String,
  hideActions: Boolean,
  items: {
    type: Array as PropType<readonly StepperItem[]>,
    default: () => ([]),
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  nonLinear: Boolean,
  flat: Boolean,

  ...makeDisplayProps(),
}, 'Stepper');

export const makeVStepperProps = propsFactory({
  ...makeStepperProps(),
  ...makeGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-stepper-item--selected',
  }),
  ...makeVSheetProps(),
  ...only(makeVStepperActionsProps(), ['prevText', 'nextText']),
}, 'VStepper');

export const _Stepper = defineComponent({
  name: 'VStepper',

  props: makeVStepperProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  slots: makeSlots<VStepperSlots>({
    actions: null,
    default: null,
    header: null,
    'header-item': null,
    icon: null,
    title: null,
    subtitle: null,
    item: null,
    prev: null,
    next: null,
    // TODO - How to handle this?
    'header-item.<name>': null,
    'item.<name>': null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRefs } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { items: _items, next, prev, selected } = useGroup(vm, props, VStepperSymbol);
    const { displayClasses, mobile } = useDisplay(vm, props);
    const { completeIcon, editIcon, errorIcon, color, editable, prevText, nextText } = toRefs(props);

    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item);
      const value = getPropertyFromItem(item, props.itemValue, index + 1);

      return {
        title,
        value,
        raw: item,
      };
    }));
    const activeIndex = computed(() => {
      return _items.value.findIndex((item) => selected.value.includes(item.id));
    });
    const disabled = computed(() => {
      if (props.disabled) return props.disabled;
      if (activeIndex.value === 0) return 'prev';
      if (activeIndex.value === _items.value.length - 1) return 'next';

      return false;
    });

    provideDefaults(vm, {
      VStepperItem: {
        editable,
        errorIcon,
        completeIcon,
        editIcon,
        prevText,
        nextText,
      },
      VStepperActions: {
        color,
        disabled,
        prevText,
        nextText,
      },
    });

    const sheetProps = computed(() => _Sheet.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-stepper',
      {
        'v-stepper--alt-labels': props.altLabels,
        'v-stepper--flat': props.flat,
        'v-stepper--non-linear': props.nonLinear,
        'v-stepper--mobile': mobile.value,
      },
      displayClasses.value,
      classes.value,
    ]));

    return {
      expose: {
        prev,
        next,
      },
      renderInput: {
        items,
        sheetProps,
        rootClasses,
        rootStyles: styles,
        prev,
        next,
      },
    };
  },
  renderHeadless: () => null,
});
