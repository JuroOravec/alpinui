// Components
import { VBannerActions } from './VBannerActions';
import { VBannerText } from './VBannerText';
import { VAvatar } from '@/components/VAvatar';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';

// Composables
import { _Banner } from './VBanner.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBannerSlots } from './VBanner.base';

export { makeVBannerProps, VBannerSlots } from './VBanner.base';

export const VBanner = genericVueComponent<VBannerSlots>()({
  ..._Banner,
  renderHeadless: (vm, { color, density, prependDefaults, rootClasses, rootStyles }, { slots, props }) => {
    const hasText = !!(props.text || slots.text);
    const hasPrependMedia = !!(props.avatar || props.icon);
    const hasPrepend = !!(hasPrependMedia || slots.prepend);

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        role="banner"
      >
        { hasPrepend && (
          <div key="prepend" class="v-banner__prepend">
            { !slots.prepend ? (
              <VAvatar
                key="prepend-avatar"
                color={ color.value }
                density={ density.value }
                icon={ props.icon }
                image={ props.avatar }
              />
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

        <div class="v-banner__content">
          { hasText && (
            <VBannerText key="text">
              { slots.text?.() ?? props.text }
            </VBannerText>
          )}

          { slots.default?.() }
        </div>

        { slots.actions && (
          <VBannerActions key="actions" v-slots:default={ slots.actions } />
        )}
      </props.tag>
    );
  },
});

export type VBanner = InstanceType<typeof VBanner>;
