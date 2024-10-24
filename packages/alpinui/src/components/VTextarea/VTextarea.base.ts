// Styles
import './VTextarea.sass';
import '../VTextField/VTextField.sass';

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
import { callEvent, clamp, convertToUnit, filterInputAttrs, normalizeClass, normalizeStyle, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VCounterSlot } from '@/components/VCounter/VCounter.base';
import type { VFieldSlots } from '@/components/VField/VField';
import type { VInput, VInputSlots } from '@/components/VInput/VInput';

export const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String] as PropType<true | number | string>,
  counterValue: Function as PropType<(value: any) => number>,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v: any) => !isNaN(parseFloat(v)),
  },
  maxRows: {
    type: [Number, String],
    validator: (v: any) => !isNaN(parseFloat(v)),
  },
  suffix: String,
  modelModifiers: Object as PropType<Record<string, boolean>>,

  ...omit(makeVInputProps(), ['centerAffix']),
  ...omit(makeVFieldProps(), ['centerAffix']),
}, 'VTextarea');

export type VTextareaSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  counter: VCounterSlot;
}

export const _Textarea = defineComponent({
  name: 'VTextarea',

  inheritAttrs: false,

  props: makeVTextareaProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  slots: makeSlots<VTextareaSlots>({
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
    const { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch, watchEffect } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');
    const { isFocused, focus, blur } = useFocus(vm, props);
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(model.value)
        : (model.value || '').toString().length;
    });
    const max = computed(() => {
      if (vm.attrs.maxlength) return vm.attrs.maxlength as string | number;

      if (
        !props.counter ||
        (typeof props.counter !== 'number' &&
        typeof props.counter !== 'string')
      ) return undefined;

      return props.counter;
    });

    function onIntersect(
      isIntersecting: boolean,
      entries: IntersectionObserverEntry[]
    ) {
      if (!props.autofocus || !isIntersecting) return;

      (entries[0].target as HTMLInputElement)?.focus?.();
    }

    const vInputRef = ref<VInput>();
    const vFieldRef = ref<VInput>();
    const controlHeight = shallowRef('');
    const textareaRef = ref<HTMLInputElement>();
    const isActive = computed(() => (
      props.persistentPlaceholder ||
      isFocused.value ||
      props.active
    ));

    function onFocus() {
      if (textareaRef.value !== document.activeElement) {
        textareaRef.value?.focus();
      }

      if (!isFocused.value) focus();
    }
    function onControlClick(e: MouseEvent) {
      onFocus();

      vm.emit('click:control', e);
    }
    function onControlMousedown(e: MouseEvent) {
      vm.emit('mousedown:control', e);
    }
    function onClear(e: MouseEvent) {
      e.stopPropagation();

      onFocus();

      nextTick(() => {
        model.value = '';

        callEvent(props['onClick:clear'], e);
      });
    }
    function onInput(e: Event) {
      const el = e.target as HTMLTextAreaElement;
      model.value = el.value;
      if (props.modelModifiers?.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }

    const sizerRef = ref<HTMLTextAreaElement>();
    const rows = ref(+props.rows);
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = +props.rows;
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;

      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;

        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);

        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) +
          parseFloat(style.getPropertyValue('--v-input-padding-top')) +
          parseFloat(style.getPropertyValue('--v-field-padding-bottom'));

        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(
          parseFloat(props.rows) * lineHeight + padding,
          parseFloat(fieldStyle.getPropertyValue('--v-input-control-height'))
        );
        const maxHeight = parseFloat(props.maxRows!) * lineHeight + padding || Infinity;
        const newHeight = clamp(height ?? 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);

        controlHeight.value = convertToUnit(newHeight);
      });
    }

    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);

    let observer: ResizeObserver | undefined;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value!);
      } else {
        observer?.disconnect();
      }
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => {
      const { modelValue: _, ...inputProps } = _Input.filterProps(props);
      return inputProps;
    });
    const fieldProps = computed(() => filterFieldProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-textarea v-text-field',
      {
        'v-textarea--prefixed': !!props.prefix,
        'v-textarea--suffixed': !!props.suffix,
        'v-text-field--prefixed': !!props.prefix,
        'v-text-field--suffixed': !!props.suffix,
        'v-textarea--auto-grow': props.autoGrow,
        'v-textarea--no-resize': props.noResize || props.autoGrow,
        'v-input--plain-underlined': isPlainOrUnderlined.value,
      },
      classes.value,
    ]));

    const fieldStyles = computed(() => normalizeStyle({
      '--v-textarea-control-height': controlHeight.value,
    }));

    return {
      expose: forwardRefs({}, vInputRef, vFieldRef, textareaRef),
      renderInput: {
        isActive,
        isFocused,
        counterValue,
        max,
        model,
        inputProps,
        fieldProps,
        vInputRef,
        vFieldRef,
        textareaRef,
        fieldStyles,
        rootClasses,
        rootStyles: styles,
        sizerRef,
        onControlMousedown,
        onControlClick,
        onClear,
        onInput,
        onIntersect,
        onFocus,
        blur,
        filterInputAttrs,
      },
    };
  },
  renderHeadless: () => null,
});
