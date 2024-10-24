// Components
import { VListChildren } from './VListChildren';

// Utilities
import { _List } from './VList.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VListChildrenSlots } from './VListChildren';
import type { GenericProps } from '@/engines/vue';
import type { SelectItemKey } from '@/util/helpers';

export { makeVListProps, VListSlots, InternalListItem, useListItems } from './VList.base';

type ItemType<T> = T extends readonly (infer U)[] ? U : never
//
// export const VList = genericComponent<>()({
export const VList = genericVueComponent<new <
  T extends readonly any[],
  S = unknown,
  O = unknown
>(
  props: {
    items?: T;
    itemTitle?: SelectItemKey<ItemType<T>>;
    itemValue?: SelectItemKey<ItemType<T>>;
    itemChildren?: SelectItemKey<ItemType<T>>;
    itemProps?: SelectItemKey<ItemType<T>>;
    selected?: S;
    'onUpdate:selected'?: (value: S) => void;
    'onClick:open'?: (value: { id: unknown, value: boolean, path: unknown[] }) => void;
    'onClick:select'?: (value: { id: unknown, value: boolean, path: unknown[] }) => void;
    opened?: O;
    'onUpdate:opened'?: (value: O) => void;
  },
  slots: VListChildrenSlots<ItemType<T>>
) => GenericProps<typeof props, typeof slots>>()({
  ..._List,
  renderHeadless: (
    vm,
    {
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
    { props, slots },
  ) => {
    return (
      <props.tag
        ref={ contentRef }
        class={ rootClasses.value }
        style={ rootStyles.value }
        tabindex={ (props.disabled || isFocused.value) ? -1 : 0 }
        role="listbox"
        aria-activedescendant={ undefined }
        onFocusin={ onFocusin }
        onFocusout={ onFocusout }
        onFocus={ onFocus }
        onKeydown={ onKeydown }
        onMousedown={ onMousedown }
      >
        <VListChildren
          items={ items.value }
          returnObject={ props.returnObject }
          v-slots={ slots }
        />
      </props.tag>
    );
  },
});

export type VList = InstanceType<typeof VList>;
