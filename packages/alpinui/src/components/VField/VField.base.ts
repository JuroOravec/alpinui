// Styles
import './VField.sass';

// Components
import { IconValue } from '@/components/VIcon/icons.base';
import { useInputIcon } from '@/components/VInput/useInputIcon';

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeFocusProps, useFocus } from '@/composables/focus';
import { makeLoaderProps, useLoader } from '@/composables/loader';
import { useRtl } from '@/composables/locale';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { animate, nullifyTransforms } from '@/util/animation';
import { defineComponent } from '@/util/defineComponent';
import { standardEasing } from '@/util/easing';
import { getUid } from '@/util/getCurrentInstance';
import { convertToUnit, EventProp, isOn, normalizeClass, normalizeStyle, pick } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType, Ref } from 'vue';
import type { VFieldLabel } from './VFieldLabel';
import type { LoaderSlotProps } from '../VLoaderSlot/VLoaderSlot.base';

const allowedVariants = ['underlined', 'outlined', 'filled', 'solo', 'solo-inverted', 'solo-filled', 'plain'] as const;
type Variant = typeof allowedVariants[number]

export interface DefaultInputSlot {
  isActive: Ref<boolean>;
  isFocused: Ref<boolean>;
  controlRef: Ref<HTMLElement | undefined>;
  focus: () => void;
  blur: () => void;
}

export interface VFieldSlot extends DefaultInputSlot {
  props: Record<string, unknown>;
}

export const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: '$clear',
  },
  active: Boolean,
  centerAffix: Boolean,
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null,
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'filled',
    validator: (v: any) => allowedVariants.includes(v),
  },

  'onClick:clear': EventProp<[MouseEvent]>(),
  'onClick:appendInner': EventProp<[MouseEvent]>(),
  'onClick:prependInner': EventProp<[MouseEvent]>(),

  ...makeComponentProps(),
  ...makeLoaderProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VField');

export type VFieldSlots = {
  clear: DefaultInputSlot & { props: Record<string, any> };
  'prepend-inner': DefaultInputSlot;
  'append-inner': DefaultInputSlot;
  label: DefaultInputSlot & { label: string | undefined, props: Record<string, any> };
  loader: LoaderSlotProps;
  default: VFieldSlot;
}

// export const VField = genericComponent<new <T>(
//   props: {
//     modelValue?: T;
//     'onUpdate:modelValue'?: (value: T) => void;
//   },
//   slots: VFieldSlots
// ) => GenericProps<typeof props, typeof slots>>()({
export const _Field = defineComponent({
  name: 'VField',

  inheritAttrs: false,

  props: {
    id: String,

    ...makeFocusProps(),
    ...makeVFieldProps(),
  },

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VFieldSlots>({
    clear: null,
    'prepend-inner': null,
    'append-inner': null,
    label: null,
    loader: null,
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, toRef, watch } = vm.reactivity;

    const { themeClasses } = provideTheme(vm, props);
    const { classes, styles } = useComponent(vm, props);
    const { loaderClasses } = useLoader(vm, props);
    const { focusClasses, isFocused, focus, blur } = useFocus(vm, props);
    const { getInputIconProps } = useInputIcon(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { rtlClasses } = useRtl(vm);

    const isSingleLine = computed(() => props.singleLine || props.centerAffix);
    const isActive = computed(() => props.dirty || props.active);
    const hasLabel = computed(() => !isSingleLine.value && !!(props.label || vm.hasSlots.label));

    const uid = getUid(vm);
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = computed(() => `${id.value}-messages`);

    const labelRef = ref<VFieldLabel>();
    const floatingLabelRef = ref<VFieldLabel>();
    const controlRef = ref<HTMLElement>();
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'bgColor'));
    const { textColorClasses, textColorStyles } = useTextColor(vm, computed(() => {
      return props.error || props.disabled ? undefined
        : isActive.value && isFocused.value ? props.color
        : props.baseColor;
    }));

    watch(isActive, (val) => {
      if (hasLabel.value) {
        const el: HTMLElement = labelRef.value!.$el;
        const targetEl: HTMLElement = floatingLabelRef.value!.$el;

        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();

          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);

          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1
            ? { maxWidth: convertToUnit(targetWidth) }
            : undefined;

          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1000 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue('--v-field-label-scale'));
          const color = targetStyle.getPropertyValue('color');

          el.style.visibility = 'visible';
          targetEl.style.visibility = 'hidden';

          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width,
          }, {
            duration,
            easing: standardEasing,
            direction: val ? 'normal' : 'reverse',
          }).finished.then(() => {
            el.style.removeProperty('visibility');
            targetEl.style.removeProperty('visibility');
          });
        });
      }
    }, { flush: 'post' });

    const slotProps = computed((): DefaultInputSlot => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus,
    }));

    function onClick(e: MouseEvent) {
      if (e.target !== document.activeElement) {
        e.preventDefault();
      }
    }

    function onKeydownClear(e: KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;

      e.preventDefault();
      e.stopPropagation();

      props['onClick:clear']?.(new MouseEvent('click'));
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const isOutlined = computed(() => props.variant === 'outlined');
    const hasPrepend = computed(() => !!(vm.hasSlots['prepend-inner'] || props.prependInnerIcon));
    const hasClear = computed(() => !!(props.clearable || vm.hasSlots.clear));
    const hasAppend = computed(() => !!(vm.hasSlots['append-inner'] || props.appendInnerIcon || hasClear.value));

    const rootClasses = computed(() => normalizeClass([
      'v-field',
      {
        'v-field--active': isActive.value,
        'v-field--appended': hasAppend.value,
        'v-field--center-affix': props.centerAffix,
        'v-field--disabled': props.disabled,
        'v-field--dirty': props.dirty,
        'v-field--error': props.error,
        'v-field--flat': props.flat,
        'v-field--has-background': !!props.bgColor,
        'v-field--persistent-clear': props.persistentClear,
        'v-field--prepended': hasPrepend.value,
        'v-field--reverse': props.reverse,
        'v-field--single-line': isSingleLine.value,
        [`v-field--variant-${props.variant}`]: true,
      },
      themeClasses.value,
      backgroundColorClasses.value,
      focusClasses.value,
      loaderClasses.value,
      roundedClasses.value,
      rtlClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {
        controlRef,
      },
      renderInput: {
        floatingLabelRef,
        labelRef,
        hasLabel,
        isPlainOrUnderlined,
        isOutlined,
        hasAppend,
        hasClear,
        hasPrepend,
        id,
        messagesId,
        onClick,
        onKeydownClear,
        rootClasses,
        rootStyles,
        slotProps,
        textColorClasses,
        textColorStyles,
        getInputIconProps,
      },
    };
  },
  renderHeadless: () => null,
});

// TODO(Vuetify): this is kinda slow, might be better to implicitly inherit props instead
export function filterFieldProps(attrs: Record<string, unknown>) {
  const keys = Object.keys(_Field.props).filter((k) => !isOn(k) && k !== 'class' && k !== 'style');
  return pick(attrs, keys);
}
