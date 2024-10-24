// Components
import { VAlertTitle } from './VAlertTitle';
import { genOverlays } from '@/components/_Overlay';
import { VBtn } from '@/components/VBtn';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Types
import { _Alert } from './VAlert.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVAlertProps, VAlertSlots } from './VAlert.base';

export const VAlert = genericVueComponent()({
  ..._Alert,

  renderHeadless: (
    vm,
    {
      borderClasses,
      closeDefaults,
      closeProps,
      icon,
      iconSize,
      isActive,
      prependDefaults,
      rootClasses,
      rootStyles,
      textColorStyles,
    },
    { slots, props }
  ) => {
    const hasPrepend = !!(slots.prepend || icon.value);
    const hasTitle = !!(slots.title || props.title);
    const hasClose = !!(slots.close || props.closable);

    if (!isActive.value) return null;

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="alert"
      >
        { genOverlays(false, 'v-alert') }

        { props.border && (
          <div
            key="border"
            class={ borderClasses.value }
            style={ textColorStyles.value }
          />
        )}

        { hasPrepend && (
          <div key="prepend" class="v-alert__prepend">
            { !slots.prepend ? (
              <VIcon
                key="prepend-icon"
                density={ props.density }
                icon={ icon.value }
                size={ iconSize.value }
              />
            ) : (
              <VDefaultsProvider
                key="prepend-defaults"
                disabled={ !icon.value }
                defaults={ prependDefaults.value }
                v-slots:default={ slots.prepend }
              />
            )}
          </div>
        )}

        <div class="v-alert__content">
          { hasTitle && (
            <VAlertTitle key="title">
              { slots.title?.() ?? props.title }
            </VAlertTitle>
          )}

          { slots.text?.() ?? props.text }

          { slots.default?.() }
        </div>

        { slots.append && (
          <div key="append" class="v-alert__append">
            { slots.append() }
          </div>
        )}

        { hasClose && (
          <div key="close" class="v-alert__close">
            { !slots.close ? (
              <VBtn
                key="close-btn"
                icon={ props.closeIcon }
                size="x-small"
                variant="text"
                { ...closeProps.value }
              />
            ) : (
              <VDefaultsProvider
                key="close-defaults"
                defaults={ closeDefaults.value }
              >
                { slots.close?.({ props: closeProps.value }) }
              </VDefaultsProvider>
            )}
          </div>
        )}
      </props.tag>
    );
  },
});

export type VAlert = InstanceType<typeof VAlert>;
