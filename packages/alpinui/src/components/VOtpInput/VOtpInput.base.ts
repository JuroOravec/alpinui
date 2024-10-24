// Styles
import './VOtpInput.sass';

// Components
import { makeVFieldProps } from '@/components/VField/VField.base';

// Composables
import { useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeFocusProps, useFocus } from '@/composables/focus';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { focusChild, normalizeClass, only } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType, Ref } from 'vue';

// Types
export type VOtpInputSlots = {
  default: never;
  loader: never;
}

export const makeVOtpInputProps = propsFactory({
  autofocus: Boolean,
  divider: String,
  focusAll: Boolean,
  label: {
    type: String,
    default: '$vuetify.input.otp',
  },
  length: {
    type: [Number, String],
    default: 6,
  },
  modelValue: {
    type: [Number, String],
    default: undefined,
  },
  placeholder: String,
  type: {
    type: String as PropType<'text' | 'password' | 'number'>,
    default: 'number',
  },

  ...makeDimensionProps(),
  ...makeFocusProps(),
  ...only(makeVFieldProps({
    variant: 'outlined' as const,
  }), [
    'baseColor',
    'bgColor',
    'class',
    'color',
    'disabled',
    'error',
    'loading',
    'rounded',
    'style',
    'theme',
    'variant',
  ]),
}, 'VOtpInput');

export const _OtpInput = defineComponent({
  name: 'VOtpInput',

  props: makeVOtpInputProps(),

  emits: {
    finish: (val: string) => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  slots: makeSlots<VOtpInputSlots>({
    default: null,
    loader: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { isFocused, focus, blur } = useFocus(vm, props);
    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      '',
      (val) => val == null ? [] : String(val).split(''),
      (val) => val.join('')
    );
    const { t } = useLocale(vm);

    const length = computed(() => Number(props.length));
    const fields = computed(() => Array(length.value).fill(0));
    const focusIndex = ref(-1);
    const contentRef = ref<HTMLElement>();
    const inputRef = ref<HTMLInputElement[]>([]);
    const current = computed(() => inputRef.value[focusIndex.value]);

    function onInput() {
      // The maxlength attribute doesn't work for the number type input, so the text type is used.
      // The following logic simulates the behavior of a number input.
      if (isValidNumber(current.value.value)) {
        current.value.value = '';
        return;
      }

      const array = model.value.slice();
      const value = current.value.value;

      array[focusIndex.value] = value;

      let target: any = null;

      if (focusIndex.value > model.value.length) {
        target = model.value.length + 1;
      } else if (focusIndex.value + 1 !== length.value) {
        target = 'next';
      }

      model.value = array;

      if (target) focusChild(contentRef.value!, target);
    }

    function onKeydown(e: KeyboardEvent) {
      const array = model.value.slice();
      const index = focusIndex.value;
      let target: 'next' | 'prev' | 'first' | 'last' | number | null = null;

      if (![
        'ArrowLeft',
        'ArrowRight',
        'Backspace',
        'Delete',
      ].includes(e.key)) return;

      e.preventDefault();

      if (e.key === 'ArrowLeft') {
        target = 'prev';
      } else if (e.key === 'ArrowRight') {
        target = 'next';
      } else if (['Backspace', 'Delete'].includes(e.key)) {
        array[focusIndex.value] = '';

        model.value = array;

        if (focusIndex.value > 0 && e.key === 'Backspace') {
          target = 'prev';
        } else {
          requestAnimationFrame(() => {
            inputRef.value[index]?.select();
          });
        }
      }

      requestAnimationFrame(() => {
        if (target != null) {
          focusChild(contentRef.value!, target);
        }
      });
    }

    function onPaste(index: number, e: ClipboardEvent) {
      e.preventDefault();
      e.stopPropagation();

      const clipboardText = e?.clipboardData?.getData('Text') ?? '';

      if (isValidNumber(clipboardText)) return;

      model.value = clipboardText.split('');

      inputRef.value?.[index].blur();
    }

    function reset() {
      model.value = [];
    }

    function onFocus(e: FocusEvent, index: number) {
      focus();

      focusIndex.value = index;
    }

    function onBlur() {
      blur();

      focusIndex.value = -1;
    }

    function isValidNumber(value: string) {
      return props.type === 'number' && /[^0-9]/g.test(value);
    }

    provideDefaults(vm, {
      VField: {
        color: computed(() => props.color),
        bgColor: computed(() => props.color),
        baseColor: computed(() => props.baseColor),
        disabled: computed(() => props.disabled),
        error: computed(() => props.error),
        variant: computed(() => props.variant),
      },
    }, { scoped: true });

    watch(model, (val) => {
      if (val.length === length.value) vm.emit('finish', val.join(''));
    }, { deep: true });

    watch(focusIndex, (val) => {
      if (val < 0) return;

      nextTick(() => {
        inputRef.value[val]?.select();
      });
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-otp-input',
      {
        'v-otp-input--divided': !!props.divider,
      },
      classes.value,
    ]));

    return {
      expose: {
        blur: () => {
          inputRef.value?.some((input) => input.blur());
        },
        focus: () => {
          inputRef.value?.[0].focus();
        },
        reset,
      },
      renderInput: {
        contentRef,
        dimensionStyles,
        fields,
        isFocused,
        focusIndex,
        // NOTE(Alpinui): Type must be set to avoid following TypeScript error:
        // TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize.
        inputRef: inputRef as Ref<HTMLInputElement[]>,
        model,
        rootClasses,
        rootStyles: styles,
        onBlur,
        onFocus,
        onInput,
        onKeydown,
        onPaste,
        t,
      },
    };
  },
  renderHeadless: () => null,
});
