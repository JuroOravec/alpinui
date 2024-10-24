// Components
import { VListGroup } from './VListGroup';
import { VListItem } from './VListItem';
import { VListSubheader } from './VListSubheader';
import { VDivider } from '../VDivider';

// Utilities
import { _ListChildren } from './VListChildren.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { InternalListItem } from './VList.base';
import type { VListChildrenSlots } from './VListChildren.base';
import type { GenericProps } from '@/engines/vue';

export { makeVListChildrenProps, VListChildrenSlots } from './VListChildren.base';

export const VListChildren = genericVueComponent<new <T extends InternalListItem>(
  props: {
    items?: readonly T[];
    returnObject?: boolean;
  },
  slots: VListChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  ..._ListChildren,
  // @ts-expect-error TODO(Alpinui) What's up with that?
  renderHeadless: (vm, _, { props, slots }) => {
    // TODO(Alpinui): No idea how I will convert this to Django template..
    return slots.default?.() ?? props.items?.map(({ children, props: itemProps, type, raw: item }) => {
      if (type === 'divider') {
        return slots.divider?.({ props: itemProps }) ?? (
          <VDivider { ...itemProps } />
        );
      }

      if (type === 'subheader') {
        return slots.subheader?.({ props: itemProps }) ?? (
          <VListSubheader { ...itemProps } />
        );
      }

      const slotsWithItem = {
        subtitle: slots.subtitle ? (slotProps: any) => slots.subtitle?.({ ...slotProps, item }) : undefined,
        prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
        append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
        title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
      };

      const listGroupProps = VListGroup.filterProps(itemProps);

      return children ? (
        <VListGroup
          value={ itemProps?.value }
          { ...listGroupProps }
        >
          {{
            activator: ({ props: activatorProps }) => {
              const listItemProps = {
                ...itemProps,
                ...activatorProps,
                value: props.returnObject ? item : itemProps.value,
              };

              return slots.header
                ? slots.header({ props: listItemProps })
                : (
                  <VListItem { ...listItemProps } v-slots={ slotsWithItem } />
                );
            },
            default: () => (
              <VListChildren
                items={ children }
                returnObject={ props.returnObject }
                v-slots={ slots }
              />
            ),
          }}
        </VListGroup>
      ) : (
        slots.item ? slots.item({ props: itemProps }) : (
          <VListItem
            { ...itemProps }
            value={ props.returnObject ? item : itemProps.value }
            v-slots={ slotsWithItem }
          />
        )
      );
    }) ?? null;
  },
});

export type VListChildren = InstanceType<typeof VListChildren>;
