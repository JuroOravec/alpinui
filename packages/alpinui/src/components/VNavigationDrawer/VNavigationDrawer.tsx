// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VImg } from '@/components/VImg';

// Utilities
import { Transition } from 'vue';
import { _NavigationDrawer } from './VNavigationDrawer.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VNavigationDrawerSlots } from './VNavigationDrawer.base';

export { makeVNavigationDrawerProps, VNavigationDrawerSlots, VNavigationDrawerImageSlot } from './VNavigationDrawer.base';

export const VNavigationDrawer = genericVueComponent<VNavigationDrawerSlots>()({
  ..._NavigationDrawer,
  renderHeadless: (
    vm,
    {
      imageDefaults,
      rootEl,
      rootClasses,
      rootStyles,
      scrimClasses,
      scrimStyles,
      showScrim,
      onScrimClick,
      scopeId,
      runOpenDelay,
      runCloseDelay,
    },
    { attrs, props, slots },
  ) => {
    const hasImage = (slots.image || props.image);

    return (
      <>
        <props.tag
          ref={ rootEl }
          onMouseenter={ runOpenDelay }
          onMouseleave={ runCloseDelay }
          class={ rootClasses.value }
          style={ rootStyles.value }
          { ...scopeId }
          { ...attrs }
        >
          { hasImage && (
            <div key="image" class="v-navigation-drawer__img">
              { !slots.image ? (
                <VImg
                  key="image-img"
                  alt=""
                  cover
                  height="inherit"
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

          { slots.prepend && (
            <div class="v-navigation-drawer__prepend">
              { slots.prepend?.() }
            </div>
          )}

          <div class="v-navigation-drawer__content">
            { slots.default?.() }
          </div>

          { slots.append && (
            <div class="v-navigation-drawer__append">
              { slots.append?.() }
            </div>
          )}
        </props.tag>

        <Transition name="fade-transition">
          { showScrim.value && (
            <div
              class={ scrimClasses.value }
              style={ scrimStyles.value }
              onClick={ onScrimClick }
              { ...scopeId }
            />
          )}
        </Transition>
      </>
    );
  },
});

export type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>;
