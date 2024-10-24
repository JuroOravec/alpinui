// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';

// Utilities
import { _TimelineDivider } from './VTimelineDivider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VTimelineDividerSlots } from './VTimelineDivider.base';

export { makeVTimelineDividerProps, VTimelineDividerSlots } from './VTimelineDivider.base';

export const VTimelineDivider = genericVueComponent<VTimelineDividerSlots>()({
  ..._TimelineDivider,
  renderHeadless: (
    vm,
    {
      rootClasses,
      rootStyles,
      beforeClasses,
      afterClasses,
      lineColorStyles,
      dotClasses,
      sizeStyles,
      dotInnerClasses,
      backgroundColorStyles,
      defaults,
    },
    { props, slots },
  ) => {
    return (
      <div
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <div
          class={ beforeClasses.value }
          style={ lineColorStyles.value }
        />

        { !props.hideDot && (
          <div
            key="dot"
            class={ dotClasses.value }
            style={ sizeStyles.value }
          >
            <div
              class={ dotInnerClasses.value }
              style={ backgroundColorStyles.value }
            >
              { !slots.default ? (
                <VIcon
                  key="icon"
                  color={ props.iconColor }
                  icon={ props.icon }
                  size={ props.size }
                />
              ) : (
                <VDefaultsProvider
                  key="icon-defaults"
                  disabled={ !props.icon }
                  defaults={ defaults.value }
                  v-slots:default={ slots.default }
                />
              )}
            </div>
          </div>
        )}

        <div
          class={ afterClasses.value }
          style={ lineColorStyles.value }
        />
      </div>
    );
  },
});

export type VTimelineDivider = InstanceType<typeof VTimelineDivider>;
