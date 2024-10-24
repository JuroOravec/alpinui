// Components
import { VBtn } from '@/components/VBtn/VBtn';

// Utilities
import { _Tab } from './VTab.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import { VTabsSymbol } from './shared';
import type { VTabSlots } from './VTab.base';

export { makeVTabProps, VTabSlots } from './VTab.base';

export const VTab = genericVueComponent<VTabSlots>()({
  ..._Tab,
  renderHeadless: (
    vm,
    {
      btnProps,
      isSelected,
      sliderEl,
      sliderClasses,
      sliderColorStyles,
      rootEl,
      rootClasses,
      rootStyles,
      updateSlider,
    },
    { attrs, props, slots },
  ) => {
    return (
      <VBtn
        symbol={ VTabsSymbol }
        ref={ rootEl }
        class={ rootClasses.value }
        style={ rootStyles.value }
        tabindex={ isSelected.value ? 0 : -1 }
        role="tab"
        aria-selected={ String(isSelected.value) }
        active={ false }
        { ...btnProps.value }
        { ...attrs }
        block={ props.fixed }
        maxWidth={ props.fixed ? 300 : undefined }
        onGroup:selected={ updateSlider }
      >
        {{
          ...slots,
          default: () => (
            <>
              { slots.default?.() ?? props.text }

              { !props.hideSlider && (
                <div
                  ref={ sliderEl }
                  class={ sliderClasses.value }
                  style={ sliderColorStyles.value }
                />
              )}
            </>
          ),
        }}
      </VBtn>
    );
  },
});

export type VTab = InstanceType<typeof VTab>;
