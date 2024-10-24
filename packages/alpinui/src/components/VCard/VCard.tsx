// Components
import { VCardActions } from './VCardActions';
import { VCardItem } from './VCardItem';
import { VCardText } from './VCardText';
import { genOverlays } from '@/components/_Overlay';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VImg } from '@/components/VImg';
import { VLoaderSlot } from '@/components/VLoaderSlot/VLoaderSlot';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { _Card } from './VCard.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VCardSlots } from './VCard.base';

export { makeVCardProps, VCardSlots } from './VCard.base';

export const VCard = genericVueComponent<VCardSlots>()({
  ..._Card,

  directives: { Ripple },

  renderHeadless: (
    vm,
    {
      isClickable,
      isLink,
      link,
      loaderColor,
      rootClasses,
      rootStyles,
      imageDefaults,
    },
    { props, slots },
  ) => {
    const Tag = isLink.value ? 'a' : props.tag;
    const hasTitle = !!(slots.title || props.title != null);
    const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
    const hasHeader = hasTitle || hasSubtitle;
    const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
    const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
    const hasImage = !!(slots.image || props.image);
    const hasCardItem = hasHeader || hasPrepend || hasAppend;
    const hasText = !!(slots.text || props.text != null);

    return (
      <Tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        href={ link.href.value }
        onClick={ isClickable.value && link.navigate }
        v-ripple={ isClickable.value && props.ripple }
        tabindex={ props.disabled ? -1 : undefined }
      >
        { hasImage && (
          <div key="image" class="v-card__image">
            { !slots.image ? (
              <VImg
                key="image-img"
                cover
                src={ props.image }
              />
            ) : (
              <VDefaultsProvider
                key="image-defaults"
                disabled={ !props.image }
                defaults={ imageDefaults.value }
                v-slots:default={ slots.image }
              />
            )}
          </div>
        )}

        <VLoaderSlot
          name="v-card"
          active={ !!props.loading }
          color={ loaderColor.value }
          v-slots={{ default: slots.loader as any }}
        />

        { hasCardItem && (
          <VCardItem
            key="item"
            prependAvatar={ props.prependAvatar }
            prependIcon={ props.prependIcon }
            title={ props.title }
            subtitle={ props.subtitle }
            appendAvatar={ props.appendAvatar }
            appendIcon={ props.appendIcon }
          >
            {{
              default: slots.item,
              prepend: slots.prepend,
              title: slots.title,
              subtitle: slots.subtitle,
              append: slots.append,
            }}
          </VCardItem>
        )}

        { hasText && (
          <VCardText key="text">
            { slots.text?.() ?? props.text }
          </VCardText>
        )}

        { slots.default?.() }

        { slots.actions && (
          <VCardActions v-slots={{ default: (...args) => slots.actions?.(...args) }} />
        )}

        { genOverlays(isClickable.value, 'v-card') }
      </Tag>
    );
  },
});

export type VCard = InstanceType<typeof VCard>;
