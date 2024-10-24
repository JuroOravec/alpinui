// Styles
import './VCombobox.sass';

// Components
import { makeTransitionProps } from '@/components/MaybeTransition/MaybeTransition.base';
import { makeSelectProps } from '@/components/VSelect/VSelect.base';
import { _TextField, makeVTextFieldProps } from '@/components/VTextField/VTextField.base';

// Composables
import { useScrolling } from '../VSelect/useScrolling';
import { useTextColor } from '@/composables/color';
import { useComponent } from '@/composables/component';
import { makeFilterProps, useFilter } from '@/composables/filter';
import { useForm } from '@/composables/form';
import { forwardRefs } from '@/composables/forwardRefs';
import { transformItem, useItems } from '@/composables/list-items';
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { IN_BROWSER } from '@/util/globals';
import { isComposingIgnoreKey, noop, normalizeClass, omit, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VFieldSlots } from '@/components/VField/VField';
import type { VInputSlots } from '@/components/VInput/VInput';
import type { VList } from '@/components/VList/VList';
import type { VMenu } from '@/components/VMenu/VMenu';
import type { ItemType } from '@/components/VSelect/VSelect.base';
import type { VVirtualScroll } from '@/components/VVirtualScroll/VVirtualScroll';
import type { ListItem } from '@/composables/list-items';

export const makeVComboboxProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String] as PropType<boolean | 'exact'>,
  },
  clearOnSelect: {
    type: Boolean,
    default: true,
  },
  delimiters: Array as PropType<readonly string[]>,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...makeSelectProps({ hideNoData: true, returnObject: true }),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox',
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({ transition: false }),
}, 'VCombobox');

export type VComboboxSlots<
  T extends readonly any[],
  Item = ItemType<T>,
> = Omit<VInputSlots & VFieldSlots, 'default'> & {
  item: { item: ListItem<Item>, index: number, props: Record<string, unknown> };
  chip: { item: ListItem<Item>, index: number, props: Record<string, unknown> };
  selection: { item: ListItem<Item>, index: number };
  'prepend-item': never;
  'append-item': never;
  'no-data': never;
}

export const _Combobox = defineComponent({
  name: 'VCombobox',

  props: makeVComboboxProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:search': (value: string) => true,
    'update:menu': (value: boolean) => true,
  },

  slots: makeSlots<VComboboxSlots<any>>({
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
    let cleared = false;
    const color = computed(() => vTextFieldRef.value?.color);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const { items, transformIn, transformOut } = useItems(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, color);
    const model = useProxiedModel(
      vm,
      props,
      'modelValue',
      [],
      (v) => transformIn(wrapInArray(v)),
      (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : (transformed[0] ?? null);
      }
    );
    const form = useForm(vm);

    const hasChips = computed(() => !!(props.chips || vm.hasSlots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || vm.hasSlots.selection);

    const _search = shallowRef(!props.multiple && !hasSelectionSlot.value ? model.value[0]?.title ?? '' : '');

    const search = computed<string>({
      get: () => {
        return _search.value;
      },
      set: (val: string | null) => {
        _search.value = val ?? '';
        if (!props.multiple && !hasSelectionSlot.value) {
          model.value = [transformItem(props, val)];
        }

        if (val && props.multiple && props.delimiters?.length) {
          const values = val.split(new RegExp(`(?:${props.delimiters.join('|')})+`));
          if (values.length > 1) {
            values.forEach((v) => {
              v = v.trim();
              if (v) select(transformItem(props, v));
            });
            _search.value = '';
          }
        }

        if (!val) selectionIndex.value = -1;

        isPristine.value = !val;
      },
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
        : (props.multiple ? model.value.length : search.value.length);
    });
    watch(_search, (value) => {
      if (cleared) {
        // wait for clear to finish, VTextField sets _search to null
        // then search computed triggers and updates _search to ''
        nextTick(() => (cleared = false));
      } else if (isFocused.value && !menu.value) {
        menu.value = true;
      }

      vm.emit('update:search', value);
    });

    watch(model, (value) => {
      if (!props.multiple && !hasSelectionSlot.value) {
        _search.value = value[0]?.title ?? '';
      }
    });

    const { filteredItems, getMatches } = useFilter(vm, props, items, () => isPristine.value ? '' : search.value);

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });

    const selectedValues = computed(() => model.value.map((selection) => selection.value));

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
      cleared = true;

      if (props.openOnClear) {
        menu.value = true;
      }
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
    // eslint-disable-next-line complexity
    function onKeydown(e: KeyboardEvent) {
      if (isComposingIgnoreKey(e) || props.readonly || form?.isReadonly.value) return;

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

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        if (
          highlightFirst.value &&
          ['Enter', 'Tab'].includes(e.key) &&
          !model.value.some(({ value }) => value === displayItems.value[0].value)
        ) {
          select(filteredItems.value[0]);
        }

        isPristine.value = true;
      }

      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next');
      }

      if (e.key === 'Enter' && search.value) {
        select(transformItem(props, search.value));
        if (hasSelectionSlot.value) _search.value = '';
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
          vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
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
    function onAfterLeave() {
      if (isFocused.value) {
        isPristine.value = true;
        vTextFieldRef.value?.focus();
      }
    }
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
        _search.value = add && !hasSelectionSlot.value ? item.title : '';

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
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

    watch(isFocused, (val, oldVal) => {
      if (val || val === oldVal) return;

      selectionIndex.value = -1;
      menu.value = false;

      if (search.value) {
        if (props.multiple) {
          select(transformItem(props, search.value));
          return;
        }

        if (!hasSelectionSlot.value) return;

        if (model.value.some(({ title }) => title === search.value)) {
          _search.value = '';
        } else {
          select(transformItem(props, search.value));
        }
      }
    });

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

    const isDirty = computed(() => model.value.length > 0);
    const textFieldProps = computed(() => _TextField.filterProps(props));
    const noDataText = computed(() => t(props.noDataText));
    const titleText = computed(() => t(label.value));

    const rootClasses = computed(() => normalizeClass([
      'v-combobox',
      {
        'v-combobox--active-menu': menu.value,
        'v-combobox--chips': !!props.chips,
        'v-combobox--selection-slot': !!hasSelectionSlot.value,
        'v-combobox--selecting-index': selectionIndex.value > -1,
        [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true,
      },
      classes.value,
    ]));

    return {
      expose: forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        selectionIndex,
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
