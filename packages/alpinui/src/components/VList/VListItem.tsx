// Components
import { VListItemSubtitle } from './VListItemSubtitle';
import { VListItemTitle } from './VListItemTitle';
import { genOverlays } from '@/components/_Overlay';
import { VAvatar } from '@/components/VAvatar';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _ListItem } from './VListItem.base';
import { genericVueComponent } from '@/engines/vue';
import { deprecate } from '@/util/console';

// Types
import type { VListItemSlots } from './VListItem.base';

export { makeVListItemProps, VListItemSlots, ListItemSlot, ListItemTitleSlot, ListItemSubtitleSlot } from './VListItem.base';

export const VListItem = genericVueComponent<VListItemSlots>()({
  ..._ListItem,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      link,
      list,
      isActive,
      isClickable,
      isLink,
      hasTitle,
      hasSubtitle,
      hasAppendMedia,
      hasAppend,
      hasPrependMedia,
      hasPrepend,
      prependDefaults,
      appendDefaults,
      rootClasses,
      rootStyles,
      slotProps,
      Tag,
      onClick,
      onKeyDown,
    },
    { props, slots },
  ) => {
    list?.updateHasPrepend(hasPrepend.value);

    if (props.activeColor) {
      deprecate('active-color', ['color', 'base-color']);
    }

    return (
      <Tag.value
        class={ rootClasses.value }
        style={ rootStyles.value }
        href={ link.href.value }
        tabindex={ isClickable.value ? (list ? -2 : 0) : undefined }
        onClick={ onClick }
        onKeydown={ isClickable.value && !isLink.value && onKeyDown }
        v-ripple={ isClickable.value && props.ripple }
      >
        { genOverlays(isClickable.value || isActive.value, 'v-list-item') }

        { hasPrepend.value && (
          <div key="prepend" class="v-list-item__prepend">
            { !slots.prepend ? (
              <>
                { props.prependAvatar && (
                  <VAvatar
                    key="prepend-avatar"
                    density={ props.density }
                    image={ props.prependAvatar }
                  />
                )}

                { props.prependIcon && (
                  <VIcon
                    key="prepend-icon"
                    density={ props.density }
                    icon={ props.prependIcon }
                  />
                )}
              </>
            ) : (
              <VDefaultsProvider
                key="prepend-defaults"
                disabled={ !hasPrependMedia.value }
                defaults={ prependDefaults.value }
              >
                { slots.prepend?.(slotProps.value) }
              </VDefaultsProvider>
            )}

            <div class="v-list-item__spacer" />
          </div>
        )}

        <div class="v-list-item__content" data-no-activator="">
          { hasTitle.value && (
            <VListItemTitle key="title">
              { slots.title?.({ title: props.title }) ?? props.title }
            </VListItemTitle>
          )}

          { hasSubtitle.value && (
            <VListItemSubtitle key="subtitle">
              { slots.subtitle?.({ subtitle: props.subtitle }) ?? props.subtitle }
            </VListItemSubtitle>
          )}

          { slots.default?.(slotProps.value) }
        </div>

        { hasAppend.value && (
          <div key="append" class="v-list-item__append">
            { !slots.append ? (
              <>
                { props.appendIcon && (
                  <VIcon
                    key="append-icon"
                    density={ props.density }
                    icon={ props.appendIcon }
                  />
                )}

                { props.appendAvatar && (
                  <VAvatar
                    key="append-avatar"
                    density={ props.density }
                    image={ props.appendAvatar }
                  />
                )}
              </>
            ) : (
              <VDefaultsProvider
                key="append-defaults"
                disabled={ !hasAppendMedia.value }
                defaults={ appendDefaults.value }
              >
                { slots.append?.(slotProps.value) }
              </VDefaultsProvider>
            )}

            <div class="v-list-item__spacer" />
          </div>
        )}
      </Tag.value>
    );
  },
});

export type VListItem = InstanceType<typeof VListItem>;
