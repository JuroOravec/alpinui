// Components
import { genOverlays } from '@/components/_Overlay';
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider';
import { VIcon } from '@/components/VIcon/VIcon';
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular';

// Directives
import { Ripple } from '@/directives/ripple';

// Utilities
import { withDirectives } from 'vue';
import { _Btn } from './VBtn.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBtnSlots } from './VBtn.base';

export { makeVBtnProps, VBtnSlots } from './VBtn.base';

export const VBtn = genericVueComponent<VBtnSlots>()({
  ..._Btn,
  renderHeadless: (
    vm,
    {
      appendDefaults,
      contentDefaults,
      isDisabled,
      link,
      onClick,
      prependDefaults,
      progressColor,
      rootClasses,
      rootStyles,
      rootTabindex,
      valueAttr,
    },
    { props, slots }
  ) => {
    const Tag = (link.isLink.value) ? 'a' : props.tag;
    const hasPrepend = !!(props.prependIcon || slots.prepend);
    const hasAppend = !!(props.appendIcon || slots.append);
    const hasIcon = !!(props.icon && props.icon !== true);

    return withDirectives(
      <Tag
        type={ Tag === 'a' ? undefined : 'button' }
        class={ rootClasses.value }
        style={ rootStyles.value }
        aria-busy={ props.loading ? true : undefined }
        disabled={ isDisabled.value || undefined }
        href={ link.href.value }
        tabindex={ rootTabindex.value }
        onClick={ onClick }
        value={ valueAttr.value }
      >
        { genOverlays(true, 'v-btn') }

        { !props.icon && hasPrepend && (
          <span key="prepend" class="v-btn__prepend">
            { !slots.prepend ? (
              <VIcon
                key="prepend-icon"
                icon={ props.prependIcon }
              />
            ) : (
              <VDefaultsProvider
                key="prepend-defaults"
                disabled={ !props.prependIcon }
                defaults={ prependDefaults.value }
                v-slots:default={ slots.prepend }
              />
            )}
          </span>
        )}

        <span class="v-btn__content" data-no-activator="">
          { (!slots.default && hasIcon && props.icon && props.icon !== true) ? (
            <VIcon
              key="content-icon"
              icon={ props.icon }
            />
          ) : (
            <VDefaultsProvider
              key="content-defaults"
              disabled={ !hasIcon }
              defaults={ contentDefaults.value }
            >
              { slots.default?.() ?? props.text }
            </VDefaultsProvider>
          )}
        </span>

        { !props.icon && hasAppend && (
          <span key="append" class="v-btn__append">
            { !slots.append ? (
              <VIcon
                key="append-icon"
                icon={ props.appendIcon }
              />
            ) : (
              <VDefaultsProvider
                key="append-defaults"
                disabled={ !props.appendIcon }
                defaults={ appendDefaults.value }
                v-slots:default={ slots.append }
              />
            )}
          </span>
        )}

        { !!props.loading && (
          <span key="loader" class="v-btn__loader">
            { slots.loader?.() ?? (
              <VProgressCircular
                color={ progressColor.value }
                indeterminate
                width="2"
              />
            )}
          </span>
        )}
      </Tag>,
      [[
        Ripple,
        !isDisabled.value && !!props.ripple,
        '',
        { center: !!props.icon },
      ]]
    );
  },
});

export type VBtn = InstanceType<typeof VBtn>;
