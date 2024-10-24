// Utilities
import { _BtnGroup } from './VBtnGroup.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBtnGroupSlots } from './VBtnGroup.base';

export { makeVBtnGroupProps, VBtnGroupSlots } from './VBtnGroup.base';

export const VBtnGroup = genericVueComponent<VBtnGroupSlots>()({
  ..._BtnGroup,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VBtnGroup = InstanceType<typeof VBtnGroup>;
