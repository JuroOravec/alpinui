// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';

// Directives
import { ClickOutside } from '@/directives/click-outside';

// Utilities
import { Teleport, Transition } from 'vue';
import { _Overlay } from './VOverlay.base';
import { genericVueComponent } from '@/engines/vue';
import { mergeProps } from '@/util/helpers';

// Types
import type { VOverlaySlots } from './VOverlay.base';
import type { BackgroundColorData } from '@/composables/color';

export { makeVOverlayProps, VOverlaySlots } from './VOverlay.base';

interface ScrimProps {
  [key: string]: unknown;
  modelValue: boolean;
  color: BackgroundColorData;
}
function Scrim(props: ScrimProps) {
  const { modelValue, color, ...rest } = props;
  return (
    <Transition name="fade-transition" appear>
      { props.modelValue && (
        <div
          class={[
            'v-overlay__scrim',
            props.color.backgroundColorClasses.value,
          ]}
          style={ props.color.backgroundColorStyles.value }
          { ...rest }
        />
      )}
    </Transition>
  );
}

export const VOverlay = genericVueComponent<VOverlaySlots>()({
  ..._Overlay,
  directives: { ClickOutside },
  renderHeadless: (
    vm,
    {
      isActive,
      activatorEl,
      activatorRef,
      activatorEvents,
      contentEl,
      contentEvents,
      contentClasses,
      contentStyles,
      hasContent,
      isMounted,
      root,
      rootClasses,
      rootStyles,
      scopeId,
      scrimEl,
      scrimEvents,
      scrimColor,
      teleportTarget,
      target,
      targetRef,
      onAfterEnter,
      onAfterLeave,
      onClickOutside,
      closeConditional,
    },
    { attrs, props, slots },
  ) => {
    return (
      <>
        { slots.activator?.({
          isActive: isActive.value,
          targetRef,
          props: mergeProps({
            ref: activatorRef,
          }, activatorEvents.value, props.activatorProps),
        })}

        { isMounted.value && hasContent.value && (
          <Teleport
            disabled={ !teleportTarget.value }
            to={ teleportTarget.value }
          >
            <div
              class={ rootClasses.value }
              style={ rootStyles.value }
              ref={ root }
              { ...scopeId }
              { ...attrs }
            >
              <Scrim
                color={ scrimColor }
                modelValue={ isActive.value && !!props.scrim }
                ref={ scrimEl }
                { ...scrimEvents.value }
              />
              <MaybeTransition
                appear
                persisted
                transition={ props.transition }
                target={ target.value }
                onAfterEnter={ onAfterEnter }
                onAfterLeave={ onAfterLeave }
              >
                <div
                  ref={ contentEl }
                  v-show={ isActive.value }
                  v-click-outside={{ handler: onClickOutside, closeConditional, include: () => [activatorEl.value] }}
                  class={ contentClasses.value }
                  style={ contentStyles.value }
                  { ...contentEvents.value }
                  { ...props.contentProps }
                >
                  { slots.default?.({ isActive }) }
                </div>
              </MaybeTransition>
            </div>
          </Teleport>
        )}
      </>
    );
  },
});

export type VOverlay = InstanceType<typeof VOverlay>;
