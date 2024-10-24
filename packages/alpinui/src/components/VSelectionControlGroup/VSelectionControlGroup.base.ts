// Styles
import './VSelectionControlGroup.sass';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps } from '@/composables/density';
import { useProxiedModel } from '@/composables/proxiedModel';
import { makeThemeProps } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { deepEqual, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { InjectionKey, PropType, Ref } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { RippleValue } from '@/directives/ripple';
import type { RawSlots } from '@/engines/types';

export interface VSelectionGroupContext {
  modelValue: Ref<any>;
  forceUpdate: () => void;
  onForceUpdate: (fn: () => void) => void;
}

export const VSelectionControlGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-control-group');

export const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleValue>,
    default: true,
  },
  multiple: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  name: String,
  readonly: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps(),
}, 'SelectionControlGroup');

export const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: 'VSelectionControl',
  }),
}, 'VSelectionControlGroup');

export interface VSelectionControlGroupSlots extends RawSlots {
  default: never;
}

export const _SelectionControlGroup = defineComponent({
  name: 'VSelectionControlGroup',

  props: makeVSelectionControlGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VSelectionControlGroupSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, provide, toRef, onBeforeUnmount } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const modelValue = useProxiedModel(vm, props, 'modelValue');
    const uid = getUid(vm);
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);

    const updateHandlers = new Set<() => void>();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        // NOTE(Alpinui): Replaced `onScopeDispose` with onBeforeUnmount
        onBeforeUnmount(() => {
          updateHandlers.delete(cb);
        });
      },
    });

    provideDefaults(vm, {
      [props.defaultsTarget]: {
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
        density: toRef(props, 'density'),
        error: toRef(props, 'error'),
        inline: toRef(props, 'inline'),
        modelValue,
        multiple: computed(() => !!props.multiple || (props.multiple == null && Array.isArray(modelValue.value))),
        name,
        falseIcon: toRef(props, 'falseIcon'),
        trueIcon: toRef(props, 'trueIcon'),
        readonly: toRef(props, 'readonly'),
        ripple: toRef(props, 'ripple'),
        type: toRef(props, 'type'),
        valueComparator: toRef(props, 'valueComparator'),
      },
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-selection-control-group',
      { 'v-selection-control-group--inline': props.inline },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
