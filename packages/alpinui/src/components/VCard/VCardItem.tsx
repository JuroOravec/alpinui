// Components
import { VCardSubtitle } from './VCardSubtitle';
import { VCardTitle } from './VCardTitle';
import { VAvatar } from '@/components/VAvatar';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Utilities
import { _CardItem } from './VCardItem.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCardItemSlots } from './VCardItem.base';

export { makeVCardItemProps, VCardItemSlots } from './VCardItem.base';

export const VCardItem = genericVueComponent<VCardItemSlots>()({
  ..._CardItem,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles, prependDefaults, appendDefaults },
    { props, slots },
  ) => {
    const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
    const hasPrepend = !!(hasPrependMedia || slots.prepend);
    const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
    const hasAppend = !!(hasAppendMedia || slots.append);
    const hasTitle = !!(props.title != null || slots.title);
    const hasSubtitle = !!(props.subtitle != null || slots.subtitle);

    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasPrepend && (
          <div key="prepend" class="v-card-item__prepend">
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
                disabled={ !hasPrependMedia }
                defaults={ prependDefaults.value }
                v-slots:default={ slots.prepend }
              />
            )}
          </div>
        )}

        <div class="v-card-item__content">
          { hasTitle && (
            <VCardTitle key="title">
              { slots.title?.() ?? props.title }
            </VCardTitle>
          )}

          { hasSubtitle && (
            <VCardSubtitle key="subtitle">
              { slots.subtitle?.() ?? props.subtitle }
            </VCardSubtitle>
          )}

          { slots.default?.() }
        </div>

        { hasAppend && (
          <div key="append" class="v-card-item__append">
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
                disabled={ !hasAppendMedia }
                defaults={ appendDefaults.value }
                v-slots:default={ slots.append }
              />
            )}
          </div>
        )}
      </div>
    );
  },
});

export type VCardItem = InstanceType<typeof VCardItem>;
