// Components
import { VDialog } from '@/components/VDialog/VDialog';

// Utilities
import { _BottomSheet } from './VBottomSheet.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VBottomSheetSlots } from './VBottomSheet.base';

export { makeVBottomSheetProps } from './VBottomSheet.base';

export const VBottomSheet = genericVueComponent<VBottomSheetSlots>()({
  ..._BottomSheet,
  renderHeadless: (
    vm,
    { dialogClasses, dialogProps, isActive, rootClasses, roootStyles },
    { slots }) => {
    return (
      <VDialog
        { ...dialogProps.value }
        contentClass={ dialogClasses.value }
        v-model={ isActive.value }
        class={ rootClasses.value }
        style={ roootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VBottomSheet = InstanceType<typeof VBottomSheet>;
