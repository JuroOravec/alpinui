// Styles
import './VAutocomplete.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';
import { useScrolling } from '@/components/VSelect/useScrolling';
import { makeSelectProps } from '@/components/VSelect/VSelect.base';
import { _TextField, makeVTextFieldProps } from '@/components/VTextField/VTextField.base';

// Composables
import { useTextColor } from '@/composables/color';
import { useComponent } from '@/composables/component';
import { makeFilterProps, useFilter } from '@/composables/filter';
import { useForm } from '@/composables/form';
import { forwardRefs } from '@/composables/forwardRefs';
import { useItems } from '@/composables/list-items';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { IN_BROWSER } from '@/util/globals';
import { matchesSelector, noop, normalizeClass, omit, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VFieldSlots } from '@/components/VField/VField';
import type { VInputSlots } from '@/components/VInput/VInput';
import type { VList } from '@/components/VList';
import type { VMenu } from '@/components/VMenu';
import type { ItemType } from '@/components/VSelect/VSelect.base';
import type { VVirtualScroll } from '@/components/VVirtualScroll';
import type { ListItem } from '@/composables/list-items';

export const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String] as PropType<boolean | 'exact'>,
  },
  clearOnSelect: Boolean,
  search: String,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({ transition: false }),
}, 'VAutocomplete');

export interface VAutocompleteSlots<
  T extends readonly any[],
  Item = ItemType<T>,
> extends Omit<VInputSlots & VFieldSlots, 'default'> {
  item: { item: ListItem<Item>, index: number, props: Record<string, unknown> };
  chip: { item: ListItem<Item>, index: number, props: Record<string, unknown> };
  selection: { item: ListItem<Item>, index: number };
  'prepend-item': never;
  'append-item': never;
  'no-data': never;
}

export const _Autocomplete = defineComponent({
  name: 'VAutocomplete',

  props: makeVAutocompleteProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:search': (value: any) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (value: boolean) => true,
  },

  slots: makeSlots<VAutocompleteSlots<any>>({
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
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
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
    const selectionIndex = shallowRef(-1);
    const color = computed(() => vTextFieldRef.value?.color);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const { items, transformIn, transformOut } = useItems(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, color);
    const search = useProxiedModel(vm, props, 'search', '');
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
    const { filteredItems, getMatches } = useFilter(vm, props, items, () => isPristine.value ? '' : search.value);

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });

    const hasChips = computed(() => !!(props.chips || vm.hasSlots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || vm.hasSlots.selection);

    const selectedValues = computed(() => model.value.map((selection) => selection.props.value));

    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true ||
        (props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title);
      return selectFirst &&
        displayItems.value.length > 0 &&
        !isPristine.value &&
        !listHasFocus.value;
    });

    const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      props.readonly || form?.isReadonly.value
    ));

    const listRef = ref<VList>();
    const { onListScroll, onListKeydown } = useScrolling(vm, listRef, vTextFieldRef);
    function onClear(e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true;
      }

      search.value = '';
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;

      menu.value = true;
    }
    function onMousedownMenuIcon(e: MouseEvent) {
      if (menuDisabled.value) return;

      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onKeydown(e: KeyboardEvent) {
      if (props.readonly || form?.isReadonly.value) return;

      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = model.value.length;

      if (
        selectionIndex.value > -1 ||
        ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)
      ) {
        e.preventDefault();
      }

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }

      if (
        highlightFirst.value &&
        ['Enter', 'Tab'].includes(e.key) &&
        !model.value.some(({ value }) => value === displayItems.value[0].value)
      ) {
        select(displayItems.value[0]);
      }

      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next');
      }

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (
          !props.multiple &&
          hasSelectionSlot.value &&
          model.value.length > 0 &&
          !search.value
        ) return select(model.value[0], false);

        if (~selectionIndex.value) {
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);

          selectionIndex.value = originalSelectionIndex >= length - 1 ? (length - 2) : originalSelectionIndex;
        } else if (e.key === 'Backspace' && !search.value) {
          selectionIndex.value = length - 1;
        }
      }

      if (!props.multiple) return;

      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart > 0) return;

        const prev = selectionIndex.value > -1
          ? selectionIndex.value - 1
          : length - 1;

        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(search.value?.length, search.value?.length);
        }
      }

      if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return;

        const next = selectionIndex.value + 1;

        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(0, 0);
        }
      }
    }

    function onChange(e: Event) {
      if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find((item) => item.title === (e.target as HTMLInputElement).value);
        if (item) {
          select(item);
        }
      }
    }

    function onAfterLeave() {
      if (isFocused.value) {
        isPristine.value = true;
        vTextFieldRef.value?.focus();
      }
    }

    function onFocusin(e: FocusEvent) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e: FocusEvent) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v: any) {
      if (v == null || (v === '' && !props.multiple && !hasSelectionSlot.value)) model.value = [];
    }

    const isSelecting = shallowRef(false);

    /** @param set - null means toggle */
    function select(item: ListItem | undefined, set: boolean | null = true) {
      if (!item || item.props.disabled) return;

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

        if (props.clearOnSelect) {
          search.value = '';
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        search.value = add && !hasSelectionSlot.value ? item.title : '';

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }

    watch(isFocused, (val, oldVal) => {
      if (val === oldVal) return;

      if (val) {
        isSelecting.value = true;
        search.value = (props.multiple || hasSelectionSlot.value) ? '' : String(model.value.at(-1)?.props.title ?? '');
        isPristine.value = true;

        nextTick(() => isSelecting.value = false);
      } else {
        if (!props.multiple && search.value == null) model.value = [];
        menu.value = false;
        if (!model.value.some(({ title }) => title === search.value)) search.value = '';
        selectionIndex.value = -1;
      }
    });

    watch(search, (val) => {
      if (!isFocused.value || isSelecting.value) return;

      if (val) menu.value = true;

      isPristine.value = !val;
    });

    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(
          (item) => model.value.some((s) => item.value === s.value)
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

    const isDirty = computed(() => model.value.length > 0);
    const textFieldProps = computed(() => _TextField.filterProps(props));
    const noDataText = computed(() => t(props.noDataText));
    const titleText = computed(() => t(label.value));

    const rootClasses = computed(() => normalizeClass([
      'v-autocomplete',
      `v-autocomplete--${props.multiple ? 'multiple' : 'single'}`,
      {
        'v-autocomplete--active-menu': !!menu.value,
        'v-autocomplete--chips': !!props.chips,
        'v-autocomplete--selection-slot': !!hasSelectionSlot.value,
        'v-autocomplete--selecting-index': selectionIndex.value > -1,
      },
      classes.value,
    ]));

    return {
      expose: forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        filteredItems,
        select,
      }, vTextFieldRef),
      renderInput: {
        displayItems,
        isDirty,
        isPristine,
        textFieldProps,
        textColorClasses,
        textColorStyles,
        vTextFieldRef,
        search,
        isFocused,
        listRef,
        selectedValues,
        model,
        menu,
        vMenuRef,
        menuDisabled,
        counterValue,
        noDataText,
        titleText,
        rootClasses,
        rootStyles: styles,
        vVirtualScrollRef,
        highlightFirst,
        hasChips,
        selectionIndex,
        getMatches,
        onUpdateModelValue,
        onChange,
        onClear,
        onMousedownControl,
        onKeydown,
        onAfterLeave,
        onListKeydown,
        onFocusin,
        onFocusout,
        onListScroll,
        select,
        noop,
        onMousedownMenuIcon,
      },
    };
  },
  renderHeadless: () => null,
});
