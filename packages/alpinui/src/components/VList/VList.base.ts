// Styles
import './VList.sass';

// Composables
import { createList } from './list';
import { makeBorderProps, useBorder } from '@/composables/border';
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { makeItemsProps } from '@/composables/list-items';
import { makeNestedProps, useNested } from '@/composables/nested/nested';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';
import { makeThemeProps, provideTheme } from '@/composables/theme';
import { makeVariantProps } from '@/composables/variant';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { EventProp, focusChild, getPropertyFromItem, normalizeClass, normalizeStyle, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import type { VListChildrenSlots } from './VListChildren.base';
import type { ItemProps, ListItem } from '@/composables/list-items';
import type { HeadlessInstance } from '@/engines/types';

export interface InternalListItem<T = any> extends ListItem<T> {
  type?: 'item' | 'subheader' | 'divider';
}

function isPrimitive(value: unknown): value is string | number | boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

function transformItem(props: ItemProps & { itemType: string }, item: any): InternalListItem {
  const type = getPropertyFromItem(item, props.itemType, 'item');
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = getPropertyFromItem(item, props.itemValue, undefined);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true
    ? omit(item, ['children'])
    : getPropertyFromItem(item, props.itemProps);

  const _props = {
    title,
    value,
    ...itemProps,
  };

  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === 'item' && children ? transformItems(props, children) : undefined,
    raw: item,
  };
}

function transformItems(props: ItemProps & { itemType: string }, items: (string | object)[]) {
  const array: InternalListItem[] = [];

  for (const item of items) {
    array.push(transformItem(props, item));
  }

  return array;
}

export function useListItems(vm: HeadlessInstance, props: ItemProps & { itemType: string }) {
  const { computed } = vm.reactivity;

  const items = computed(() => transformItems(props, props.items));

  return { items };
}

export const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
    default: 'one',
  },
  slim: Boolean,
  nav: Boolean,

  'onClick:open': EventProp<[{ id: unknown, value: boolean, path: unknown[] }]>(),
  'onClick:select': EventProp<[{ id: unknown, value: boolean, path: unknown[] }]>(),
  'onUpdate:opened': EventProp<[]>(),
  ...makeNestedProps({
    selectStrategy: 'single-leaf' as const,
    openStrategy: 'list' as const,
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  itemType: {
    type: String,
    default: 'type',
  },
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VList');

export type VListSlots<T> = VListChildrenSlots<T>;

export const _List = defineComponent({
  name: 'VList',

  props: makeVListProps(),

  emits: {
    'update:selected': (value: unknown) => true,
    'update:activated': (value: unknown) => true,
    'update:opened': (value: unknown) => true,
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:activate': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
  },

  slots: makeSlots<VListSlots<any>>({
    default: null,
    item: null,
    divider: null,
    subheader: null,
    header: null,
    prepend: null,
    append: null,
    title: null,
    subtitle: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref, shallowRef, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { items } = useListItems(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'bgColor'));
    const { borderClasses } = useBorder(vm, props);
    const { densityClasses } = useDensity(vm, props);
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { roundedClasses } = useRounded(vm, props);
    const { children, open, parents, select } = useNested(vm, props);
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : undefined);
    const activeColor = toRef(props, 'activeColor');
    const baseColor = toRef(props, 'baseColor');
    const color = toRef(props, 'color');

    createList(vm);

    provideDefaults(vm, {
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(props, 'expandIcon'),
        collapseIcon: toRef(props, 'collapseIcon'),
      },
      VListItem: {
        activeClass: toRef(props, 'activeClass'),
        activeColor,
        baseColor,
        color,
        density: toRef(props, 'density'),
        disabled: toRef(props, 'disabled'),
        lines: toRef(props, 'lines'),
        nav: toRef(props, 'nav'),
        slim: toRef(props, 'slim'),
        variant: toRef(props, 'variant'),
      },
    });

    const isFocused = shallowRef(false);
    const contentRef = ref<HTMLElement>();
    function onFocusin(e: FocusEvent) {
      isFocused.value = true;
    }

    function onFocusout(e: FocusEvent) {
      isFocused.value = false;
    }

    function onFocus(e: FocusEvent) {
      if (
        !isFocused.value &&
        !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))
      ) focus();
    }

    function onKeydown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;

      if (!contentRef.value || ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (e.key === 'ArrowDown') {
        focus('next');
      } else if (e.key === 'ArrowUp') {
        focus('prev');
      } else if (e.key === 'Home') {
        focus('first');
      } else if (e.key === 'End') {
        focus('last');
      } else {
        return;
      }

      e.preventDefault();
    }

    function onMousedown(e: MouseEvent) {
      isFocused.value = true;
    }

    function focus(location?: 'next' | 'prev' | 'first' | 'last') {
      if (contentRef.value) {
        return focusChild(contentRef.value, location);
      }
    }

    const rootClasses = computed(() => normalizeClass([
      'v-list',
      {
        'v-list--disabled': props.disabled,
        'v-list--nav': props.nav,
        'v-list--slim': props.slim,
      },
      themeClasses.value,
      backgroundColorClasses.value,
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      lineClasses.value,
      roundedClasses.value,
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      dimensionStyles.value,
      styles.value,
    ]));

    return {
      expose: {
        open,
        select,
        focus,
        children,
        parents,
      },
      renderInput: {
        items,
        isFocused,
        contentRef,
        rootClasses,
        rootStyles,
        onFocusin,
        onFocusout,
        onFocus,
        onKeydown,
        onMousedown,
      },
    };
  },
  renderHeadless: () => null,
});
