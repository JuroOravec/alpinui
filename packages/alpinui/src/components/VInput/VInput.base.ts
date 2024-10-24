// Styles
import './VInput.sass';

// Components
import { useInputIcon } from '@/components/VInput/useInputIcon';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { useRtl } from '@/composables/locale';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeValidationProps, useValidation } from '@/composables/validation';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { EventProp, normalizeClass, normalizeStyle, only } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComputedRef, PropType, Ref } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { VMessageSlot } from '@/components/VMessages/VMessages';

export interface VInputSlot {
  id: ComputedRef<string>;
  messagesId: ComputedRef<string>;
  isDirty: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  isReadonly: ComputedRef<boolean>;
  isPristine: Ref<boolean>;
  isValid: ComputedRef<boolean | null>;
  isValidating: Ref<boolean>;
  reset: () => void;
  resetValidation: () => void;
  validate: () => void;
}

export const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  centerAffix: Boolean,
  prependIcon: IconValue,
  hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String] as PropType<string | readonly string[]>,
    default: () => ([]),
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['horizontal', 'vertical'].includes(v),
  },

  'onClick:prepend': EventProp<[MouseEvent]>(),
  'onClick:append': EventProp<[MouseEvent]>(),

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...only(makeDimensionProps(), [
    'maxWidth',
    'minWidth',
    'width',
  ]),
  ...makeThemeProps(),
  ...makeValidationProps(),
}, 'VInput');

export type VInputSlots = {
  default: VInputSlot;
  prepend: VInputSlot;
  append: VInputSlot;
  details: VInputSlot;
  message: VMessageSlot;
}

export const _Input = defineComponent({
  name: 'VInput',

  props: {
    ...makeVInputProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VInputSlots>({
    default: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { rtlClasses } = useRtl(vm);
    const { getInputIconProps } = useInputIcon(vm, props);

    const uid = getUid(vm);
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = computed(() => `${id.value}-messages`);

    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses,
    } = useValidation(vm, props, 'v-input', id);

    const slotProps = computed<VInputSlot>(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
    }));

    const messages = computed(() => {
      if (props.errorMessages?.length || (!isPristine.value && errorMessages.value.length)) {
        return errorMessages.value;
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint;
      } else {
        return props.messages;
      }
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-input',
      `v-input--${props.direction}`,
      {
        'v-input--center-affix': props.centerAffix,
        'v-input--hide-spin-buttons': props.hideSpinButtons,
      },
      densityClasses.value,
      themeClasses.value,
      rtlClasses.value,
      validationClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      dimensionStyles.value,
      styles.value,
    ]));

    const hasPrepend = computed(() => !!(vm.hasSlots.prepend || props.prependIcon));
    const hasAppend = computed(() => !!(vm.hasSlots.append || props.appendIcon));
    const hasMessages = computed(() => messages.value.length > 0);
    const hasDetails = computed(() => !props.hideDetails || (
      props.hideDetails === 'auto' &&
      (hasMessages.value || !!vm.hasSlots.details)
    ));

    return {
      expose: {
        reset,
        resetValidation,
        validate,
        isValid,
        errorMessages,
      },
      renderInput: {
        hasAppend,
        hasDetails,
        hasMessages,
        hasPrepend,
        messages,
        messagesId,
        rootClasses,
        rootStyles,
        slotProps,
        getInputIconProps,
      },
    };
  },
  renderHeadless: () => null,
});
