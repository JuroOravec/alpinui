// Styles
import './VFileInput.sass';

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField.base';
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';

// Composables
import { useComponent } from '@/composables/component';
import { useFocus } from '@/composables/focus';
import { forwardRefs } from '@/composables/forwardRefs';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { callEvent, filterInputAttrs, humanReadableFileSize, normalizeClass, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VFieldSlots } from '@/components/VField/VField';
import type { VInput, VInputSlots } from '@/components/VInput/VInput';

export type VFileInputSlots = VInputSlots & VFieldSlots & {
  counter: never;
  selection: {
    fileNames: string[];
    totalBytes: number;
    totalBytesReadable: string;
  };
}

export const makeVFileInputProps = propsFactory({
  chips: Boolean,
  counter: Boolean,
  counterSizeString: {
    type: String,
    default: '$vuetify.fileInput.counterSize',
  },
  counterString: {
    type: String,
    default: '$vuetify.fileInput.counter',
  },
  hideInput: Boolean,
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String] as PropType<boolean | 1000 | 1024>,
    default: false,
    validator: (v: boolean | number) => {
      return (
        typeof v === 'boolean' ||
        [1000, 1024].includes(Number(v))
      );
    },
  },

  ...makeVInputProps({ prependIcon: '$file' }),

  modelValue: {
    type: [Array, Object] as PropType<File[] | File | null>,
    default: (props: any) => props.multiple ? [] : null,
    validator: (val: any) => {
      return wrapInArray(val).every((v) => v != null && typeof v === 'object');
    },
  },

  ...makeVFieldProps({ clearable: true }),
}, 'VFileInput');

export const _FileInput = defineComponent({
  name: 'VFileInput',

  inheritAttrs: false,

  props: makeVFileInputProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (files: File | File[]) => true,
  },

  slots: makeSlots<VFileInputSlots>({
    counter: null,
    selection: null,
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
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { t } = useLocale(vm);
    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      props.modelValue,
      (val) => wrapInArray(val),
      (val) => (props.multiple || Array.isArray(props.modelValue)) ? val : (val[0] ?? null),
    );
    const { isFocused, focus, blur } = useFocus(vm, props);
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, { size = 0 }) => bytes + size, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));

    const fileNames = computed(() => (model.value ?? []).map((file) => {
      const { name = '', size = 0 } = file;

      return !props.showSize
        ? name
        : `${name} (${humanReadableFileSize(size, base.value)})`;
    }));

    const counterValue = computed(() => {
      const fileCount = model.value?.length ?? 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);
      else return t(props.counterString, fileCount);
    });
    const vInputRef = ref<VInput>();
    const vFieldRef = ref<VInput>();
    const inputRef = ref<HTMLInputElement>();
    const isActive = computed(() => (
      isFocused.value ||
      props.active
    ));
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        inputRef.value?.focus();
      }

      if (!isFocused.value) focus();
    }
    function onClickPrepend(e: MouseEvent) {
      inputRef.value?.click();
    }
    function onControlMousedown(e: MouseEvent) {
      vm.emit('mousedown:control', e);
    }
    function onControlClick(e: MouseEvent) {
      inputRef.value?.click();

      vm.emit('click:control', e);
    }
    function onClear(e: MouseEvent) {
      e.stopPropagation();

      onFocus();

      nextTick(() => {
        model.value = [];

        callEvent(props['onClick:clear'], e);
      });
    }

    watch(model, (newValue) => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;

      if (hasModelReset && inputRef.value) {
        inputRef.value.value = '';
      }
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
      'v-file-input',
      {
        'v-file-input--chips': !!props.chips,
        'v-file-input--hide': props.hideInput,
        'v-input--plain-underlined': isPlainOrUnderlined.value,
      },
      classes.value,
    ]));

    return {
      expose: forwardRefs({}, vInputRef, vFieldRef, inputRef),
      renderInput: {
        isActive,
        isFocused,
        isPlainOrUnderlined,
        model,
        fileNames,
        totalBytes,
        totalBytesReadable,
        counterValue,
        vFieldRef,
        vInputRef,
        inputRef,
        inputProps,
        fieldProps,
        rootClasses,
        rootStyles: styles,
        onClickPrepend,
        onControlClick,
        onControlMousedown,
        onClear,
        onFocus,
        blur,
        filterInputAttrs,
      },
    };
  },
  renderHeadless: () => null,
});
