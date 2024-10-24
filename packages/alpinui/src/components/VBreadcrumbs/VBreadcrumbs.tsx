// Components
import { VBreadcrumbsDivider } from './VBreadcrumbsDivider';
import { VBreadcrumbsItem } from './VBreadcrumbsItem';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Utilities
import { _Breadcrumbs } from './VBreadcrumbs.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { BreadcrumbItem, VBreadcrumbsSlots } from './VBreadcrumbs.base';
import type { GenericProps } from '@/engines/vue';

export { makeVBreadcrumbsProps, VBreadcrumbsSlots } from './VBreadcrumbs.base';

export const VBreadcrumbs = genericVueComponent<new <T extends BreadcrumbItem>(
  props: {
    items?: T[];
  },
  slots: VBreadcrumbsSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Breadcrumbs,
  renderHeadless: (
    vm,
    { items, prependDefaults, rootClasses, rootStyles },
    { slots, props }
  ) => {
    const hasPrepend = !!(slots.prepend || props.icon);

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasPrepend && (
          <li key="prepend" class="v-breadcrumbs__prepend">
            { !slots.prepend ? (
              <VIcon
                key="prepend-icon"
                start
                icon={ props.icon }
              />
            ) : (
              <VDefaultsProvider
                key="prepend-defaults"
                disabled={ !props.icon }
                defaults={ prependDefaults.value }
                v-slots:default={ slots.prepend }
              />
            )}
          </li>
        )}

        { items.value.map(({ item, raw }, index, array) => (
          <>
            { slots.item?.({ item, index }) ?? (
              <VBreadcrumbsItem
                key={ index }
                disabled={ index >= array.length - 1 }
                { ...(typeof item === 'string' ? { title: item } : item) }
                v-slots={{
                  default: slots.title ? () => slots.title?.({ item, index }) : undefined,
                }}
              />
            )}

            { index < array.length - 1 && (
              <VBreadcrumbsDivider
                v-slots={{
                  default: slots.divider ? () => slots.divider?.({ item: raw, index }) : undefined,
                }}
              />
            )}
          </>
        ))}

        { slots.default?.() }
      </props.tag>
    );
  },
});

export type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>;
