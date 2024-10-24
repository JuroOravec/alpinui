// Styles
import './VStepperItem.sass';

// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group';

// Utilities
import { VStepperSymbol } from './shared';
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { ClassValue } from '@/composables/component';
import type { RippleValue } from '@/directives/ripple';

export type StepperItem = string | Record<string, any>

export type StepperItemSlot = {
  canEdit: boolean;
  hasError: boolean;
  hasCompleted: boolean;
  title?: string | number;
  subtitle?: string | number;
  step: any;
}

export type VStepperItemSlots = {
  default: StepperItemSlot;
  icon: StepperItemSlot;
  title: StepperItemSlot;
  subtitle: StepperItemSlot;
}

export type ValidationRule = () => string | boolean

export const makeStepperItemProps = propsFactory({
  color: String,
  title: String,
  subtitle: String,
  complete: Boolean,
  completeIcon: {
    type: String,
    default: '$complete',
  },
  editable: Boolean,
  editIcon: {
    type: String,
    default: '$edit',
  },
  error: Boolean,
  errorIcon: {
    type: String,
    default: '$error',
  },
  icon: String,
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },
  rules: {
    type: Array as PropType<readonly ValidationRule[]>,
    default: () => ([]),
  },
}, 'StepperItem');

export const makeVStepperItemProps = propsFactory({
  ...makeStepperItemProps(),
  ...makeGroupItemProps(),
}, 'VStepperItem');

export const _StepperItem = defineComponent({
  name: 'VStepperItem',

  props: makeVStepperItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  slots: makeSlots<VStepperItemSlots>({
    default: null,
    icon: null,
    title: null,
    subtitle: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const group = useGroupItem(vm, props, VStepperSymbol, true);
    const step = computed(() => group?.value.value ?? props.value);
    const isValid = computed(() => props.rules.every((handler) => handler() === true));
    const isClickable = computed(() => !props.disabled && props.editable);
    const canEdit = computed(() => !props.disabled && props.editable);
    const hasError = computed(() => props.error || !isValid.value);
    const hasCompleted = computed(() => props.complete || (props.rules.length > 0 && isValid.value));
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon;
      if (hasCompleted.value) return props.completeIcon;
      if (group.isSelected.value && props.editable) return props.editIcon;

      return props.icon;
    });
    const slotProps = computed(() => ({
      canEdit: canEdit.value,
      hasError: hasError.value,
      hasCompleted: hasCompleted.value,
      title: props.title,
      subtitle: props.subtitle,
      step: step.value,
      value: props.value,
    }));

    function onClick() {
      group?.toggle();
    }

    const hasColor = computed(() => (
      !group ||
      group.isSelected.value ||
      hasCompleted.value ||
      canEdit.value
    ) && (
      !hasError.value &&
      !props.disabled
    ));

    const rootClasses = computed(() => normalizeClass([
      'v-stepper-item',
      {
        'v-stepper-item--complete': hasCompleted.value,
        'v-stepper-item--disabled': props.disabled,
        'v-stepper-item--error': hasError.value,
      },
      group?.selectedClass.value as ClassValue,
    ]));

    return {
      expose: {},
      renderInput: {
        icon,
        step,
        hasColor,
        isClickable,
        slotProps,
        rootClasses,
        onClick,
      },
    };
  },
  renderHeadless: () => null,
});
