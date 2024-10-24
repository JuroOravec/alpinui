// Utilities
import { _Sheet } from './VSheet.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSheetSlots } from './VSheet.base';

export { makeVSheetProps, VSheetSlots } from './VSheet.base';

export const VSheet = genericVueComponent<VSheetSlots>()({
  ..._Sheet,
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

export type VSheet = InstanceType<typeof VSheet>;
