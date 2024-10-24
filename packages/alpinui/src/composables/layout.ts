// Composables
import { useResizeObserver } from '@/composables/resizeObserver';

// Utilities
import { getUid } from '@/util/getCurrentInstance';
import { convertToUnit, eagerComputed, findIndexOfChildrenWithProvide } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { CSSProperties, InjectionKey, Prop, Ref } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

export type Position = 'top' | 'left' | 'right' | 'bottom'

export interface Layer {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface LayoutItem extends Layer {
  id: string;
  size: number;
  position: Position;
}

interface LayoutProvide {
  register: (
    vm: HeadlessInstance,
    options: {
      id: string;
      order: Ref<number>;
      position: Ref<Position>;
      layoutSize: Ref<number | string>;
      elementSize: Ref<number | string | undefined>;
      active: Ref<boolean>;
      disableTransitions?: Ref<boolean>;
      absolute: Ref<boolean | undefined>;
    }
  ) => {
    layoutItemStyles: Ref<CSSProperties>;
    layoutItemScrimStyles: Ref<CSSProperties>;
    zIndex: Ref<number>;
  };
  unregister: (id: string) => void;
  mainRect: Ref<Layer>;
  mainStyles: Ref<CSSProperties>;
  getLayoutItem: (id: string) => LayoutItem | undefined;
  items: Ref<LayoutItem[]>;
  layoutRect: Ref<DOMRectReadOnly | undefined>;
  rootZIndex: Ref<number>;
  layoutIsReady: Promise<void>;
}

export const VuetifyLayoutKey: InjectionKey<LayoutProvide> = Symbol.for('vuetify:layout');
export const VuetifyLayoutItemKey: InjectionKey<{ id: string }> = Symbol.for('vuetify:layout-item');

const ROOT_ZINDEX = 1000;

export const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => ([]),
  } as Prop<string[]>,
  fullHeight: Boolean,
}, 'layout');

// Composables
export const makeLayoutItemProps = propsFactory({
  name: {
    type: String,
  },
  order: {
    type: [Number, String],
    default: 0,
  },
  absolute: Boolean,
}, 'layout-item');

export function useLayout(vm: HeadlessInstance) {
  const { inject, nextTick } = vm.reactivity;

  const layout = inject(VuetifyLayoutKey);

  if (!layout) throw new Error('[Vuetify] Could not find injected layout');

  const layoutIsReady = nextTick();

  return {
    layoutIsReady,
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles,
  };
}

export function useLayoutItem(
  vm: HeadlessInstance,
  options: {
    id: string | undefined;
    order: Ref<number>;
    position: Ref<Position>;
    layoutSize: Ref<number | string>;
    elementSize: Ref<number | string | undefined>;
    active: Ref<boolean>;
    disableTransitions?: Ref<boolean>;
    absolute: Ref<boolean | undefined>;
  }
) {
  const { inject, provide, shallowRef, nextTick, computed, onBeforeUnmount, onDeactivated, onActivated } = vm.reactivity;
  const layout = inject(VuetifyLayoutKey);

  if (!layout) throw new Error('[Vuetify] Could not find injected layout');

  const id = options.id ?? `layout-item-${getUid(vm)}`;

  provide(VuetifyLayoutItemKey, { id });

  const isKeptAlive = shallowRef(false);

  // NOTE: KeepAlive not applicable for Alpinui
  onDeactivated(() => isKeptAlive.value = true);
  onActivated(() => isKeptAlive.value = false);

  const layoutIsReady = nextTick();

  const {
    layoutItemStyles,
    layoutItemScrimStyles,
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id,
  });

  onBeforeUnmount(() => layout.unregister(id));

  return { layoutItemStyles, layoutRect: layout.layoutRect, layoutItemScrimStyles, layoutIsReady };
}

const generateLayers = (
  layout: string[],
  positions: Map<string, Ref<Position>>,
  layoutSizes: Map<string, Ref<number | string>>,
  activeItems: Map<string, Ref<boolean>>,
): { id: string, layer: Layer }[] => {
  let previousLayer: Layer = { top: 0, left: 0, right: 0, bottom: 0 };
  const layers = [{ id: '', layer: { ...previousLayer } }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active) continue;

    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0),
    };

    layers.push({
      id,
      layer,
    });

    previousLayer = layer;
  }

  return layers;
};

export function createLayout(
  vm: HeadlessInstance,
  props: { overlaps?: string[], fullHeight?: boolean },
) {
  const { computed, reactive, ref, inject, nextTick, provide } = vm.reactivity;

  const parentLayout = inject(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref<string[]>([]);
  const positions = reactive(new Map<string, Ref<Position>>());
  const layoutSizes = reactive(new Map<string, Ref<number | string>>());
  const priorities = reactive(new Map<string, Ref<number>>());
  const activeItems = reactive(new Map<string, Ref<boolean>>());
  const disabledTransitions = reactive(new Map<string, Ref<boolean>>());
  const { resizeRef, contentRect: layoutRect } = useResizeObserver(vm);

  const layers = eagerComputed(vm, () => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items = registered.value.filter((id) => priorities.get(id)?.value === p);
      layout.push(...items);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });

  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref) => ref.value);
  });

  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });

  const mainStyles = computed<CSSProperties>(() => {
    return {
      '--v-layout-left': convertToUnit(mainRect.value.left),
      '--v-layout-right': convertToUnit(mainRect.value.right),
      '--v-layout-top': convertToUnit(mainRect.value.top),
      '--v-layout-bottom': convertToUnit(mainRect.value.bottom),
      ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
    };
  });

  const items = eagerComputed(vm, () => {
    return layers.value.slice(1).map(({ id }, index) => {
      const { layer } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);

      return {
        id,
        ...layer,
        size: Number(size!.value),
        position: position!.value,
      };
    });
  });

  const getLayoutItem = (id: string) => {
    return items.value.find((item) => item.id === id);
  };

  const layoutIsReady = nextTick();

  const rootVm = vm;

  provide(VuetifyLayoutKey, {
    register: (
      vm,
      {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute,
      }
    ) => {
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);

      const instanceIndex = findIndexOfChildrenWithProvide(rootVm, vm, VuetifyLayoutItemKey);

      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);
      else registered.value.push(id);

      const index = computed(() => items.value.findIndex((i) => i.id === id));
      const zIndex = computed(() => rootZIndex.value + (layers.value.length * 2) - (index.value * 2));

      const layoutItemStyles = computed<CSSProperties>(() => {
        const isHorizontal = position.value === 'left' || position.value === 'right';
        const isOppositeHorizontal = position.value === 'right';
        const isOppositeVertical = position.value === 'bottom';
        const size = elementSize.value ?? layoutSize.value;
        const unit = size === 0 ? '%' : 'px';

        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -(size === 0 ? 100 : size)) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}${unit})`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
          ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
        } as const;

        if (index.value < 0) throw new Error(`Layout item "${id}" is missing`);

        const item = items.value[index.value];

        if (!item) throw new Error(`[Vuetify] Could not find layout item "${id}"`);

        return {
          ...styles,
          height:
            isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)`
            : elementSize.value ? `${elementSize.value}px`
            : undefined,
          left: isOppositeHorizontal ? undefined : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : undefined,
          top: position.value !== 'bottom' ? `${item.top}px` : undefined,
          bottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
          width:
            !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)`
            : elementSize.value ? `${elementSize.value}px`
            : undefined,
        };
      });

      const layoutItemScrimStyles = computed<CSSProperties>(() => ({
        zIndex: zIndex.value - 1,
      }));

      return { layoutItemStyles, layoutItemScrimStyles, zIndex };
    },
    unregister: (id: string) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v) => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex,
    layoutIsReady,
  });

  const layoutClasses = computed((): ClassValue => ({
    'v-layout': true,
    'v-layout--full-height': !!props.fullHeight,
  }));

  const layoutStyles = computed(() => ({
    zIndex: parentLayout ? rootZIndex.value : undefined,
    position: parentLayout ? 'relative' as const : undefined,
    overflow: parentLayout ? 'hidden' : undefined,
  }));

  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutIsReady,
    layoutRef: resizeRef,
  };
}
