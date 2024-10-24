// Styles
import './VTextField.sass';

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField.base';
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';

// Composables
import { useComponent } from '@/composables/component';
import { useFocus } from '@/composables/focus';
import { forwardRefs } from '@/composables/forwardRefs';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { callEvent, filterInputAttrs, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VCounterSlot } from '@/components/VCounter/VCounter.base';
import type { VField, VFieldSlots } from '@/components/VField/VField';
import type { VInput, VInputSlots } from '@/components/VInput/VInput';

const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];

export const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function] as PropType<number | ((value: any) => number)>,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: 'text',
  },
  modelModifiers: Object as PropType<Record<string, boolean>>,

  ...makeVInputProps(),
  ...makeVFieldProps(),
}, 'VTextField');

export type VTextFieldSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  default: never;
  counter: VCounterSlot;
}

export const _TextField = defineComponent({
  name: 'VTextField',

  inheritAttrs: false,

  props: makeVTextFieldProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  slots: makeSlots<VTextFieldSlots>({
    default: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
    clear: null,
    'prepend-inner': null,
    'append-inner': null,
    label: null,
    loader: null,
    counter: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const { isFocused, focus, blur } = useFocus(vm, props);
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
        : (model.value ?? '').toString().length;
    });
    const max = computed(() => {
      if (vm.attrs.maxlength) return vm.attrs.maxlength as unknown as undefined;

      if (
        !props.counter ||
        (typeof props.counter !== 'number' &&
        typeof props.counter !== 'string')
      ) return undefined;

      return props.counter;
    });

    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));

    function onIntersect(
      isIntersecting: boolean,
      entries: IntersectionObserverEntry[]
    ) {
      if (!props.autofocus || !isIntersecting) return;

      (entries[0].target as HTMLInputElement)?.focus?.();
    }

    const vInputRef = ref<VInput>();
    const vFieldRef = ref<VField>();
    const inputRef = ref<HTMLInputElement>();
    const isActive = computed(() => (
      activeTypes.includes(props.type) ||
      props.persistentPlaceholder ||
      isFocused.value ||
      props.active
    ));
    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        inputRef.value?.focus();
      }

      if (!isFocused.value) focus();
    }
    function onControlMousedown(e: MouseEvent) {
      vm.emit('mousedown:control', e);

      if (e.target === inputRef.value) return;

      onFocus();
      e.preventDefault();
    }
    function onControlClick(e: MouseEvent) {
      onFocus();

      vm.emit('click:control', e);
    }
    function onClear(e: MouseEvent) {
      e.stopPropagation();

      onFocus();

      nextTick(() => {
        model.value = null;

        callEvent(props['onClick:clear'], e);
      });
    }
    function onInput(e: Event) {
      const el = e.target as HTMLInputElement;
      model.value = el.value;
      if (
        props.modelModifiers?.trim &&
        ['text', 'search', 'password', 'tel', 'url'].includes(props.type)
      ) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => {
      const { modelValue: _, ...inputProps } = _Input.filterProps(props);
      return inputProps;
    });

    const fieldProps = computed(() => filterFieldProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-text-field',
      {
        'v-text-field--prefixed': !!props.prefix,
        'v-text-field--suffixed': !!props.suffix,
        'v-input--plain-underlined': isPlainOrUnderlined.value,
      },
      classes.value,
    ]));

    return {
      expose: forwardRefs({}, vInputRef, vFieldRef, inputRef),
      renderInput: {
        isActive,
        isFocused,
        counterValue,
        max,
        filterInputAttrs,
        fieldProps,
        inputProps,
        model,
        inputRef,
        vInputRef,
        vFieldRef,
        rootClasses,
        rootStyles: styles,
        onControlMousedown,
        onControlClick,
        onClear,
        onInput,
        onIntersect,
        onFocus,
        blur,
      },
    };
  },
  renderHeadless: () => null,
});
