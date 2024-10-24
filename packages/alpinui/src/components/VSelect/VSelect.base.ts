// Styles
import './VSelect.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';
import { IconValue } from '@/components/VIcon/icons.base';
import { _TextField, makeVTextFieldProps } from '@/components/VTextField/VTextField.base';

// Composables
import { useScrolling } from './useScrolling';
import { useComponent } from '@/composables/component';
import { useForm } from '@/composables/form';
import { forwardRefs } from '@/composables/forwardRefs';
import { makeItemsProps, useItems } from '@/composables/list-items';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { IN_BROWSER } from '@/util/globals';
import { matchesSelector, mergeProps, normalizeClass, omit, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Component, PropType } from 'vue';
import type { VFieldSlots } from '@/components/VField/VField';
import type { VInputSlots } from '@/components/VInput/VInput';
import type { VList } from '@/components/VList/VList';
import type { VMenu } from '@/components/VMenu/VMenu';
import type { VVirtualScroll } from '@/components/VVirtualScroll';
import type { VVirtualScrollSlots } from '@/components/VVirtualScroll/VVirtualScroll.base';
import type { ListItem } from '@/composables/list-items';

export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: '$vuetify.close',
  },
  openText: {
    type: String,
    default: '$vuetify.open',
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object as PropType<VList['$props']>,
  },
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown',
  },
  menuProps: {
    type: Object as PropType<VMenu['$props']>,
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  openOnClear: Boolean,
  itemColor: String,

  ...makeItemsProps({ itemChildren: false }),
}, 'Select');

export const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  // NOTE(Alpinui): This is set in the Vue file to avoid import Vue in headless
  ...makeTransitionProps({ transition: { component: null as any as Component } }),
}, 'VSelect');

export type ItemType<T> = T extends readonly (infer U)[] ? U : never

export type VSelectSlots<T extends readonly any[], Item = ItemType<T>> =
  Omit<VInputSlots & VFieldSlots, 'default'> & {
    item: { item: ListItem<Item>, index: number, props: Record<string, unknown> };
    chip: { item: ListItem<Item>, index: number, props: Record<string, unknown> };
    selection: { item: ListItem<Item>, index: number };
    'prepend-item': never;
    'append-item': never;
    'no-data': never;
  };

export const _Select = defineComponent({
  name: 'VSelect',

  props: makeVSelectProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (ue: boolean) => true,
  },

  slots: makeSlots<VSelectSlots<any[]>>({
    item: null,
    chip: null,
    selection: null,
    'prepend-item': null,
    'append-item': null,
    'no-data': null,
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
    const { computed, nextTick, ref, shallowRef, watch } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { t } = useLocale(vm);
    const vTextFieldRef = ref();
    const vMenuRef = ref<VMenu>();
    const vVirtualScrollRef = ref<VVirtualScroll>();
    const _menu = useProxiedModel(vm, props, 'menu');
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
        _menu.value = v;
      },
    });
    const { items, transformIn, transformOut } = useItems(vm, props);
    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      [],
      (v) => transformIn(v === null ? [null] : wrapInArray(v)),
      (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : (transformed[0] ?? null);
      }
    );
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
        : model.value.length;
    });
    const form = useForm(vm);
    const selectedValues = computed(() => model.value.map((selection) => selection.value));
    const isFocused = shallowRef(false);
    const label = computed(() => menu.value ? props.closeText : props.openText);

    let keyboardLookupPrefix = '';
    let keyboardLookupLastTime: number;

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !model.value.some((s) => props.valueComparator(s, item)));
      }
      return items.value;
    });

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      props.readonly || form?.isReadonly.value
    ));

    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox', // Set aria-haspopup to 'listbox'
        },
      };
    });

    const listRef = ref<VList>();
    const { onListScroll, onListKeydown } = useScrolling(vm, listRef, vTextFieldRef);
    function onClear(e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;

      menu.value = !menu.value;
    }
    function onKeydown(e: KeyboardEvent) {
      if (!e.key || props.readonly || form?.isReadonly.value) return;

      if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
      }

      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false;
      }

      if (e.key === 'Home') {
        listRef.value?.focus('first');
      } else if (e.key === 'End') {
        listRef.value?.focus('last');
      }

      // html select hotkeys
      const KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds

      function checkPrintable(e: KeyboardEvent) {
        const isPrintableChar = e.key.length === 1;
        const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey;
        return isPrintableChar && noModifier;
      }

      if (props.multiple || !checkPrintable(e)) return;

      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = '';
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;

      const item = items.value.find((item) => item.title.toLowerCase().startsWith(keyboardLookupPrefix));
      if (item !== undefined) {
        model.value = [item];
        const index = displayItems.value.indexOf(item);
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
        });
      }
    }

    /** @param set - null means toggle */
    function select(item: ListItem, set: boolean | null = true) {
      if (item.props.disabled) return;

      if (props.multiple) {
        const index = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
        const add = set == null ? !~index : set;

        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];

        nextTick(() => {
          menu.value = false;
        });
      }
    }
    function onBlur(e: FocusEvent) {
      if (!listRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
        menu.value = false;
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        vTextFieldRef.value?.focus();
      }
    }
    function onFocusin(e: FocusEvent) {
      isFocused.value = true;
    }
    function onModelUpdate(v: any) {
      if (v == null) model.value = [];
      else if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find((item) => item.title === v);
        if (item) {
          select(item);
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = '';
      }
    }

    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(
          (item) => model.value.some((s) => props.valueComparator(s.value, item.value))
        );
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
        });
      }
    });

    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;

      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const genItemProps = ({ index, item, itemRef }: VVirtualScrollSlots['default']) => {
      return mergeProps(item.props, {
        ref: itemRef,
        key: index,
        onClick: () => select(item, null),
      });
    };

    const genChipProps = (item: any) => {
      function onChipClose(e: Event) {
        e.stopPropagation();
        e.preventDefault();

        select(item, false);
      }

      return {
        'onClick:close': onChipClose,
        onKeydown(e: KeyboardEvent) {
          if (e.key !== 'Enter' && e.key !== ' ') return;

          e.preventDefault();
          e.stopPropagation();

          onChipClose(e);
        },
        onMousedown(e: MouseEvent) {
          e.preventDefault();
          e.stopPropagation();
        },
        modelValue: true,
        'onUpdate:modelValue': undefined,
      };
    };

    const textFieldProps = computed(() => _TextField.filterProps(props));
    const isDirty = computed(() => model.value.length > 0);
    const modelValue = computed(() => model.value.map((v) => v.props.value).join(', '));
    const title = computed(() => t(label.value));
    const showNoData = computed(() => !displayItems.value.length && !props.hideNoData);
    const noDataText = computed(() => t(props.noDataText));

    const placeholder = computed(() => isDirty.value || (
      !isFocused.value &&
      props.label &&
      !props.persistentPlaceholder
    ) ? undefined : props.placeholder);

    const rootClasses = computed(() => normalizeClass([
      'v-select',
      {
        'v-select--active-menu': menu.value,
        'v-select--chips': !!props.chips,
        [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
        'v-select--selected': !!model.value.length,
        'v-select--selection-slot': vm.hasSlots.selection,
      },
      classes.value,
    ]));

    return {
      expose: forwardRefs({
        isFocused,
        menu,
        select,
      }, vTextFieldRef),
      renderInput: {
        counterValue,
        isDirty,
        isFocused,
        model,
        modelValue,
        menu,
        menuDisabled,
        computedMenuProps,
        placeholder,
        title,
        displayItems,
        genItemProps,
        genChipProps,
        showNoData,
        noDataText,
        textFieldProps,
        selectedValues,
        listRef,
        vMenuRef,
        vTextFieldRef,
        vVirtualScrollRef,
        rootClasses,
        rootStyles: styles,
        onModelUpdate,
        onClear,
        onMousedownControl,
        onBlur,
        onKeydown,
        onAfterLeave,
        onListKeydown,
        onListScroll,
        onFocusin,
      },
    };
  },
  renderHeadless: () => null,
});
