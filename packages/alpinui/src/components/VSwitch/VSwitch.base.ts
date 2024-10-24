// Styles
import './VSwitch.sass';

// Components
import { _Input, makeVInputProps } from '@/components/VInput/VInput.base';
import { _SelectionControl, makeVSelectionControlProps } from '@/components/VSelectionControl/VSelectionControl.base';

// Composables
import { useComponent } from '@/composables/component';
import { useFocus } from '@/composables/focus';
import { useLoader } from '@/composables/loader';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { IN_BROWSER } from '@/util/globals';
import { filterInputAttrs, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComputedRef, Ref } from 'vue';
import type { IconValue } from '@/components/VIcon/icons.base';
import type { VInputSlots } from '@/components/VInput/VInput';
import type { LoaderSlotProps } from '@/components/VLoaderSlot/VLoaderSlot.base';
import type { VSelectionControl, VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl';

export type VSwitchSlot = {
  model: Ref<boolean>;
  isValid: ComputedRef<boolean | null>;
}

export type VSwitchSlots =
  & VInputSlots
  & VSelectionControlSlots
  & {
    loader: LoaderSlotProps;
    thumb: { icon: IconValue | undefined } & VSwitchSlot;
    'track-false': VSwitchSlot;
    'track-true': VSwitchSlot;
  }

export const makeVSwitchProps = propsFactory({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: false,
  },

  ...makeVInputProps(),
  ...makeVSelectionControlProps(),
}, 'VSwitch');

export const _Switch = defineComponent({
  name: 'VSwitch',

  inheritAttrs: false,

  props: makeVSwitchProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  slots: makeSlots<VSwitchSlots>({
    default: null,
    prepend: null,
    append: null,
    details: null,
    message: null,
    label: null,
    input: null,
    loader: null,
    thumb: null,
    'track-false': null,
    'track-true': null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const indeterminate = useProxiedModel(vm, props, 'indeterminate');
    const model = useProxiedModel(vm, props, 'modelValue');
    const { loaderClasses } = useLoader(vm, props);
    const { isFocused, focus, blur } = useFocus(vm, props);
    const control = ref<VSelectionControl>();
    const isForcedColorsModeActive = IN_BROWSER && window.matchMedia('(forced-colors: active)').matches;

    const loaderColor = computed(() => {
      return typeof props.loading === 'string' && props.loading !== ''
        ? props.loading
        : props.color;
    });

    const uid = getUid(vm);
    const id = computed(() => props.id || `switch-${uid}`);

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    function onTrackClick(e: Event) {
      e.stopPropagation();
      e.preventDefault();
      control.value?.input?.click();
    }

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const inputProps = computed(() => _Input.filterProps(props));
    const controlProps = computed(() => _SelectionControl.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-switch',
      { 'v-switch--flat': props.flat },
      { 'v-switch--inset': props.inset },
      { 'v-switch--indeterminate': indeterminate.value },
      loaderClasses.value,
      classes.value,
    ]));

    const genThumbDefaults = (icon: IconValue | undefined) => ({
      VIcon: {
        icon,
        size: 'x-small',
      },
    });

    return {
      expose: {},
      renderInput: {
        control,
        model,
        id,
        isFocused,
        isForcedColorsModeActive,
        indeterminate,
        loaderColor,
        controlProps,
        inputProps,
        rootClasses,
        rootStyles: styles,
        genThumbDefaults,
        filterInputAttrs,
        onChange,
        focus,
        blur,
        onTrackClick,
      },
    };
  },
  renderHeadless: () => null,
});
