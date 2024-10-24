// Styles
import './VSelectionControl.sass';

// Components
import {
  makeSelectionControlGroupProps,
  VSelectionControlGroupSymbol,
} from '@/components/VSelectionControlGroup/VSelectionControlGroup.base';

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useDensity } from '@/composables/density';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { matchesSelector, normalizeClass, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { CSSProperties, ExtractPropTypes, Ref, VNode, WritableComputedRef } from 'vue';
import type { IconValue } from '../VIcon/icons.base';
import type { HeadlessInstance } from '@/engines/types';
import type { EventProp } from '@/util/helpers';

export type SelectionControlSlot = {
  model: WritableComputedRef<boolean>;
  textColorClasses: Ref<string[]>;
  textColorStyles: Ref<CSSProperties>;
  backgroundColorClasses: Ref<string[]>;
  backgroundColorStyles: Ref<CSSProperties>;
  inputNode: VNode;
  icon: IconValue | undefined;
  props: {
    onBlur: (e: Event) => void;
    onFocus: (e: FocusEvent) => void;
    id: string;
  };
}

export type VSelectionControlSlots = {
  default: {
    backgroundColorClasses: Ref<string[]>;
    backgroundColorStyles: Ref<CSSProperties>;
  };
  label: { label: string | undefined, props: Record<string, unknown> };
  input: SelectionControlSlot;
}

export const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,

  ...makeComponentProps(),
  ...makeSelectionControlGroupProps(),
}, 'VSelectionControl');

export function useSelectionControl(
  vm: HeadlessInstance,
  props: ExtractPropTypes<ReturnType<typeof makeVSelectionControlProps>> & {
    'onUpdate:modelValue'?: EventProp | undefined;
  }
) {
  const { computed, inject } = vm.reactivity;

  const group = inject(VSelectionControlGroupSymbol, undefined);
  const { densityClasses } = useDensity(vm, props);
  const modelValue = useProxiedModel(vm, props, 'modelValue');
  const trueValue = computed(() => (
    props.trueValue !== undefined ? props.trueValue
    : props.value !== undefined ? props.value
    : true
  ));
  const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false);
  const isMultiple = computed(() => (
    !!props.multiple ||
    (props.multiple == null && Array.isArray(modelValue.value))
  ));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;

      return isMultiple.value
        ? wrapInArray(val).some((v: any) => props.valueComparator(v, trueValue.value))
        : props.valueComparator(val, trueValue.value);
    },
    set(val: boolean) {
      if (props.readonly) return;

      const currentValue = val ? trueValue.value : falseValue.value;

      let newVal = currentValue;

      if (isMultiple.value) {
        newVal = val
          ? [...wrapInArray(modelValue.value), currentValue]
          : wrapInArray(modelValue.value).filter((item: any) => !props.valueComparator(item, trueValue.value));
      }

      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    },
  });
  const { textColorClasses, textColorStyles } = useTextColor(vm, computed(() => {
    if (props.error || props.disabled) return undefined;

    return model.value ? props.color : props.baseColor;
  }));
  const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, computed(() => {
    return (
      model.value &&
      !props.error &&
      !props.disabled
    ) ? props.color : props.baseColor;
  }));
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);

  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon,
  };
}

export const _SelectionControl = defineComponent({
  name: 'VSelectionControl',

  inheritAttrs: false,

  props: makeVSelectionControlProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VSelectionControlSlots>({
    default: null,
    label: null,
    input: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref, shallowRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue,
    } = useSelectionControl(vm, props);
    const uid = getUid(vm);
    const isFocused = shallowRef(false);
    const isFocusVisible = shallowRef(false);
    const input = ref<HTMLInputElement>();
    const id = computed(() => props.id || `input-${uid}`);
    const isInteractive = computed(() => !props.disabled && !props.readonly);

    group?.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });

    function onFocus(e: FocusEvent) {
      if (!isInteractive.value) return;

      isFocused.value = true;
      if (matchesSelector(e.target as HTMLElement, ':focus-visible') !== false) {
        isFocusVisible.value = true;
      }
    }

    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }

    function onClickLabel(e: Event) {
      e.stopPropagation();
    }

    function onInput(e: Event) {
      if (!isInteractive.value) {
        if (input.value) {
          // model value is not updated when input is not interactive
          // but the internal checked state of the input is still updated,
          // so here it's value is restored
          input.value.checked = model.value;
        }

        return;
      }

      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = (e.target as HTMLInputElement).checked;
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-selection-control',
      {
        'v-selection-control--dirty': model.value,
        'v-selection-control--disabled': !!props.disabled,
        'v-selection-control--error': props.error,
        'v-selection-control--focused': isFocused.value,
        'v-selection-control--focus-visible': isFocusVisible.value,
        'v-selection-control--inline': props.inline,
      },
      densityClasses.value,
      classes.value,
    ]));

    const wrapperClasses = computed(() => normalizeClass([
      'v-selection-control__wrapper',
      textColorClasses.value,
    ]));

    return {
      expose: {
        isFocused,
        input,
      },
      renderInput: {
        rootClasses,
        rootStyles: styles,
        wrapperClasses,
        icon,
        id,
        input,
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        trueValue,
        onBlur,
        onFocus,
        onClickLabel,
        onInput,
      },
    };
  },
  renderHeadless: () => null,
});
