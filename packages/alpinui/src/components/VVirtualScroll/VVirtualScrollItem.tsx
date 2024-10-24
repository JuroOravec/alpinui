// Utilities
import { _VirtualScrollItem } from './VVirtualScrollItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VVirtualScrollItemSlots } from './VVirtualScrollItem.base';
import type { GenericProps } from '@/engines/vue';

export { makeVVirtualScrollItemProps, VVirtualScrollItemSlots } from './VVirtualScrollItem.base';

export const VVirtualScrollItem = genericVueComponent<new <Renderless extends boolean = false>(
  props: {
    renderless?: Renderless;
  },
  slots: VVirtualScrollItemSlots<Renderless>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._VirtualScrollItem,
  renderHeadless: (
    vm,
    { resizeRef, rootClasses, rootStyles },
    { attrs, props, slots },
  ) => {
    return props.renderless ? (
      <>
        { slots.default?.({ itemRef: resizeRef }) }
      </>
    ) : (
      <div
        ref={ resizeRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...attrs }
      >
        { (slots.default as any)?.() }
      </div>
    );
  },
});

export type VVirtualScrollItem = InstanceType<typeof VVirtualScrollItem>;
