// Components
import { VBtn } from '@/components/VBtn';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';
import { VImg } from '@/components/VImg';

// Utilities
import { _EmptyState } from './VEmptyState.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VEmptyStateSlots } from './VEmptyState.base';

export { makeVEmptyStateProps, VEmptyStateSlots } from './VEmptyState.base';

export const VEmptyState = genericVueComponent<VEmptyStateSlots>()({
  ..._EmptyState,
  renderHeadless: (
    vm,
    {
      size,
      actionDefaults,
      mediaDefaults,
      rootClasses,
      rootStyles,
      textStyles,
      onClickAction,
    },
    { props, slots },
  ) => {
    // TODO(Alpinui): Convert these to the combination of Alpine and Django checks.
    const hasActions = !!(slots.actions || props.actionText);
    const hasHeadline = !!(slots.headline || props.headline);
    const hasTitle = !!(slots.title || props.title);
    const hasText = !!(slots.text || props.text);
    const hasMedia = !!(slots.media || props.image || props.icon);

    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasMedia && (
          <div key="media" class="v-empty-state__media">
            { !slots.media ? (
              <>
                { props.image ? (
                  <VImg
                    key="image"
                    src={ props.image }
                    height={ size.value }
                  />
                ) : props.icon ? (
                  <VIcon
                    key="icon"
                    color={ props.color }
                    size={ size.value }
                    icon={ props.icon }
                  />
                ) : undefined }
              </>
            ) : (
              <VDefaultsProvider
                key="media-defaults"
                defaults={ mediaDefaults.value }
              >
                { slots.media() }
              </VDefaultsProvider>
            )}
          </div>
        )}

        { hasHeadline && (
          <div key="headline" class="v-empty-state__headline">
            { slots.headline?.() ?? props.headline }
          </div>
        )}

        { hasTitle && (
          <div key="title" class="v-empty-state__title">
            { slots.title?.() ?? props.title }
          </div>
        )}

        { hasText && (
          <div
            key="text"
            class="v-empty-state__text"
            style={ textStyles.value }
          >
            { slots.text?.() ?? props.text }
          </div>
        )}

        { slots.default && (
          <div key="content" class="v-empty-state__content">
            { slots.default() }
          </div>
        )}

        { hasActions && (
          <div key="actions" class="v-empty-state__actions">
            <VDefaultsProvider
              defaults={ actionDefaults.value }
            >
              {
                slots.actions?.({ props: { onClick: onClickAction } }) ?? (
                  <VBtn onClick={ onClickAction } />
                )
              }
            </VDefaultsProvider>
          </div>
        )}
      </div>
    );
  },
});

export type VEmptyState = InstanceType<typeof VEmptyState>;
