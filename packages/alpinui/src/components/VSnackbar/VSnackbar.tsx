// Components
import { genOverlays } from '../_Overlay';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VOverlay } from '@/components/VOverlay';
import { VProgressLinear } from '@/components/VProgressLinear';

// Utilities
import { _Snackbar } from './VSnackbar.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSnackbarSlots } from './VSnackbar.base';

export { makeVSnackbarProps, VSnackbarSlots } from './VSnackbar.base';

export const VSnackbar = genericVueComponent<VSnackbarSlots>()({
  ..._Snackbar,
  renderHeadless: (
    vm,
    {
      countdown,
      isActive,
      isHovering,
      scopeId,
      overlay,
      timerRef,
      actionsDefaults,
      contentProps,
      overlayProps,
      rootClasses,
      rootStyles,
      onTouchstart,
      onTouchend,
    },
    { props, slots },
  ) => {
    const hasContent = !!(slots.default || slots.text || props.text);

    return (
      <VOverlay
        ref={ overlay }
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...overlayProps.value }
        v-model={ isActive.value }
        contentProps={ contentProps.value }
        persistent
        noClickAnimation
        scrim={ false }
        scrollStrategy="none"
        _disableGlobalStack
        onTouchstartPassive={ onTouchstart }
        onTouchend={ onTouchend }
        { ...scopeId }
        v-slots={{ activator: slots.activator }}
      >
        { genOverlays(false, 'v-snackbar') }

        { props.timer && !isHovering.value && (
          <div key="timer" class="v-snackbar__timer">
            <VProgressLinear
              ref={ timerRef }
              color={ typeof props.timer === 'string' ? props.timer : 'info' }
              max={ props.timeout }
              model-value={ countdown.time.value }
            />
          </div>
        )}

        { hasContent && (
          <div
            key="content"
            class="v-snackbar__content"
            role="status"
            aria-live="polite"
          >
            { slots.text?.() ?? props.text }

            { slots.default?.() }
          </div>
        )}

        { slots.actions && (
          <VDefaultsProvider
            defaults={ actionsDefaults.value }
          >
            <div class="v-snackbar__actions">
              { slots.actions({ isActive }) }
            </div>
          </VDefaultsProvider>
        )}
      </VOverlay>
    );
  },
});

export type VSnackbar = InstanceType<typeof VSnackbar>;
