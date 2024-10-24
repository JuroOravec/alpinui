// Components
import { genOverlays } from '@/components/_Overlay';
import { VExpandXTransition } from '@/components/transitions';
import { VAvatar } from '@/components/VAvatar';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _Chip } from './VChip.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VChipSlots } from './VChip.base';

export { makeVChipProps, VChipSlots } from './VChip.base';

export const VChip = genericVueComponent<VChipSlots>()({
  ..._Chip,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      closeProps,
      group,
      isActive,
      isClickable,
      isLink,
      link,
      onClick,
      onKeyDown,
      appendDefaults,
      closeDefaults,
      filterDefaults,
      prependDefaults,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    const Tag = (link.isLink.value) ? 'a' : props.tag;
    const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
    const hasAppend = !!(hasAppendMedia || slots.append);
    const hasClose = !!(slots.close || props.closable);
    const hasFilter = !!(slots.filter || props.filter) && group;
    const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
    const hasPrepend = !!(hasPrependMedia || slots.prepend);

    if (!isActive.value) return null;

    return (
      <Tag
        class={[
          rootClasses.value,
          { 'v-chip--filter': hasFilter },
        ]}
        style={ rootStyles.value }
        disabled={ props.disabled || undefined }
        draggable={ props.draggable }
        href={ link.href.value }
        tabindex={ isClickable.value ? 0 : undefined }
        onClick={ onClick }
        onKeydown={ isClickable.value && !isLink.value && onKeyDown }
        v-ripple={[isClickable.value && props.ripple, null]}
      >
        { genOverlays(isClickable.value, 'v-chip') }

        { hasFilter && (
          <VExpandXTransition key="filter">
            <div
              class="v-chip__filter"
              v-show={ group.isSelected.value }
            >
              { !slots.filter ? (
                <VIcon
                  key="filter-icon"
                  icon={ props.filterIcon }
                />
              ) : (
                <VDefaultsProvider
                  key="filter-defaults"
                  disabled={ !props.filterIcon }
                  defaults={ filterDefaults.value }
                  v-slots:default={ slots.filter }
                />
              )}
            </div>
          </VExpandXTransition>
        )}

        { hasPrepend && (
          <div key="prepend" class="v-chip__prepend">
            { !slots.prepend ? (
              <>
                { props.prependIcon && (
                  <VIcon
                    key="prepend-icon"
                    icon={ props.prependIcon }
                    start
                  />
                )}

                { props.prependAvatar && (
                  <VAvatar
                    key="prepend-avatar"
                    image={ props.prependAvatar }
                    start
                  />
                )}
              </>
            ) : (
              <VDefaultsProvider
                key="prepend-defaults"
                disabled={ !hasPrependMedia }
                defaults={ prependDefaults.value }
                v-slots:default={ slots.prepend }
              />
            )}
          </div>
        )}

        <div class="v-chip__content" data-no-activator="">
          { slots.default?.({
            isSelected: group?.isSelected.value,
            selectedClass: group?.selectedClass.value,
            select: group?.select,
            toggle: group?.toggle,
            value: group?.value.value,
            disabled: props.disabled,
          }) ?? props.text }
        </div>

        { hasAppend && (
          <div key="append" class="v-chip__append">
            { !slots.append ? (
              <>
                { props.appendIcon && (
                  <VIcon
                    key="append-icon"
                    end
                    icon={ props.appendIcon }
                  />
                )}

                { props.appendAvatar && (
                  <VAvatar
                    key="append-avatar"
                    end
                    image={ props.appendAvatar }
                  />
                )}
              </>
            ) : (
              <VDefaultsProvider
                key="append-defaults"
                disabled={ !hasAppendMedia }
                defaults={ appendDefaults.value }
                v-slots:default={ slots.append }
              />
            )}
          </div>
        )}

        { hasClose && (
          <button
            key="close"
            class="v-chip__close"
            type="button"
            { ...closeProps.value }
          >
            { !slots.close ? (
              <VIcon
                key="close-icon"
                icon={ props.closeIcon }
                size="x-small"
              />
            ) : (
              <VDefaultsProvider
                key="close-defaults"
                defaults={ closeDefaults.value }
                v-slots:default={ slots.close }
              />
            )}
          </button>
        )}
      </Tag>
    );
  },
});

export type VChip = InstanceType<typeof VChip>;
